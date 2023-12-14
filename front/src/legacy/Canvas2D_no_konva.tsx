import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { COLORS } from '../consts';

interface PCAData {
  points_labels: number[];
  points: number[][];
}

const getBounds = (data: number[][]) => {
  return {
    minX: -25,
    maxX: 25,
    minY: -25,
    maxY: 25,
  };
};

interface Canvas2DProps {
  maxPoints: number;
}

interface PCAData {
  points_labels: number[];
  points: number[][];
}

interface Canvas2DProps {
  maxPoints: number;
}

export function Canvas2D({ maxPoints }: Canvas2DProps) {
  const [pcaData, setPcaData] = useState<PCAData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);

  React.useEffect(() => {
    console.log(maxPoints, pcaData);
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/pca')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPcaData({
          points: data.points.slice(0, maxPoints),
          points_labels: data.points_labels.slice(0, maxPoints),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [maxPoints]);

  const drawPoints = () => {
    const canvas = canvasRef.current;
    if (!canvas || !pcaData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bounds = getBounds(pcaData.points);
    const width = canvas.width;
    const height = canvas.height;

    const xScale = d3.scaleLinear([bounds.minX, bounds.maxX], [0, width]);
    const yScale = d3.scaleLinear([bounds.minY, bounds.maxY], [height, 0]);

    pcaData.points.forEach((point, i) => {
      ctx.beginPath();
      ctx.arc(
        xScale(point[0]),
        yScale(point[1]),
        2, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      ctx.fillStyle = Object.values(COLORS)[pcaData.points_labels[i] ?? 0];
      ctx.fill();
    });
  };
  console.log('rerender & drawn');

  const updateScalesAndAxes = () => {
    if (!pcaData || !svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const bounds = getBounds(pcaData.points);

    const newXScale = d3.scaleLinear([bounds.minX, bounds.maxX], [0, width]);
    const newYScale = d3.scaleLinear([bounds.minY, bounds.maxY], [height, 0]);

    // Update axes
    if (newXScale && newYScale && xAxisRef.current && yAxisRef.current) {
      const xAxis = d3.axisBottom(newXScale);
      const yAxis = d3.axisLeft(newYScale);

      d3.select(xAxisRef.current)
        .call(xAxis)
        .attr('transform', `translate(0,${height})`);
      d3.select(yAxisRef.current).call(yAxis);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !svgRef.current) return;

    // Adjust canvas size to its container
    canvas.style.width = svgRef.current.clientWidth + 'px';
    canvas.style.height = svgRef.current.clientHeight + 'px';
    // canvas.width = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;

    drawPoints();
    updateScalesAndAxes();
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [pcaData]);

  return (
    <div id="pca2d" className="grow w-full relative p-12">
      <svg
        width="100%"
        height="100%"
        ref={svgRef}
        className="overflow-visible absolute top-12 left-12"
      >
        <g ref={xAxisRef} />
        <g ref={yAxisRef} />
      </svg>
      <canvas
        ref={canvasRef}
        width={svgRef.current?.clientWidth ?? 0}
        height={svgRef.current?.clientHeight ?? 0}
        className="absolute top-12 left-12"
      />
    </div>
  );
}
