import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Star } from 'react-konva';
import * as d3 from 'd3';
import { BOUNDS, COLORS } from '../consts';
import { Tooltip } from './Tooltip';
import { DataContext, Labels } from '../app/app';
import { findKeyOfMaxValue } from '../utils';
import { useLocalStorage } from '@uidotdev/usehooks';

interface Canvas2DProps {
  maxPoints: number;
}

export interface PCAData {
  points_labels: number[];
  points_texts: string[];
  points: number[][];
}

export interface UserPoints {
  input: string;
  points_pca: number[];
  points_umap: number[];
  labels: Labels;
}

export function Canvas2D({ maxPoints }: Canvas2DProps) {
  const [theme] = useLocalStorage('theme');
  const [pcaData, setPcaData] = useState<PCAData | null>(null);
  const [userPoints, setUserPoints] = useState<UserPoints[] | null>(null);
  const [resized, setResized] = useState(1);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: '',
    emotion: '',
  });

  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const layerRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/pca')
      .then((response) => response.json())
      .then((data) => {
        setPcaData({
          points: data.points.slice(0, maxPoints),
          points_labels: data.points_labels.slice(0, maxPoints),
          points_texts: data.points_texts.slice(0, maxPoints),
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [maxPoints]);

  const ctx = React.useContext(DataContext);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/savedText')
      .then((response) => response.json())
      .then((data) => {
        setUserPoints(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [ctx]);

  const updateScalesAndAxes = () => {
    if (
      pcaData &&
      svgRef.current &&
      svgRef.current.clientWidth > 0 &&
      svgRef.current.clientHeight > 0
    ) {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      // Update scales
      const newXScale = d3.scaleLinear([BOUNDS.minX, BOUNDS.maxX], [0, width]);
      const newYScale = d3.scaleLinear([BOUNDS.minY, BOUNDS.maxY], [height, 0]);

      // Update axes - only if scales are defined
      if (newXScale && newYScale) {
        const xAxis = d3.axisBottom(newXScale);
        const yAxis = d3.axisLeft(newYScale);

        if (xAxisRef.current && yAxisRef.current) {
          d3.select(xAxisRef.current)
            .call(xAxis)
            .attr('transform', `translate(0,${height})`);
          d3.select(yAxisRef.current).call(yAxis);
        }
      }
    }
  };

  useEffect(() => {
    if (!pcaData) return;
    updateScalesAndAxes(); // Initial axes drawing

    // Resize event listener
    const handleResize = () => {
      updateScalesAndAxes();
      setResized((prev) => prev + 1);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcaData]);

  const initialized = pcaData && userPoints && svgRef.current;

  return (
    <div id="pca2d" className="grow w-full p-12 relative">
      {tooltip.show && (
        <Tooltip
          content={tooltip.content}
          emotion={tooltip.emotion}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
      <svg width="100%" height="100%" ref={svgRef} className="overflow-visible">
        <g ref={xAxisRef} />
        <g ref={yAxisRef} />
      </svg>
      {initialized && resized ? (
        <Stage
          width={svgRef.current?.clientWidth ?? 0}
          height={svgRef.current?.clientHeight ?? 0}
          className="absolute top-12 left-12"
        >
          <Layer ref={layerRef}>
            {pcaData.points.map((d, i) => (
              <Circle
                key={i}
                x={d3.scaleLinear(
                  [BOUNDS.minX, BOUNDS.maxX],
                  [0, svgRef.current?.clientWidth ?? 0]
                )(d[0])}
                y={d3.scaleLinear(
                  [BOUNDS.minY, BOUNDS.maxY],
                  [svgRef.current?.clientHeight ?? 0, 0]
                )(d[1])}
                radius={3}
                fill={Object.values(COLORS)[pcaData.points_labels[i] ?? 0]}
                onMouseOver={(e) => {
                  const node = e.target;
                  node.to({ radius: 8 });
                  const x = node.getStage()?.getPointerPosition()?.x;
                  const y = node.getStage()?.getPointerPosition()?.y;
                  if (x && y) {
                    setTooltip({
                      show: true,
                      x: x + 10, // adjust position as needed
                      y: y,
                      content: pcaData.points_texts[i],
                      emotion: Object.keys(COLORS)[pcaData.points_labels[i]],
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.to({ radius: 3 });
                  setTooltip({ ...tooltip, show: false });
                }}
              />
            ))}
            {userPoints.map((point, i) => {
              const emotion = findKeyOfMaxValue(
                point.labels
              ) as keyof typeof COLORS;
              return (
                <Star
                  numPoints={5}
                  key={'star' + i}
                  x={d3.scaleLinear(
                    [BOUNDS.minX, BOUNDS.maxX],
                    [0, svgRef.current?.clientWidth ?? 0]
                  )(point.points_pca[0])}
                  y={d3.scaleLinear(
                    [BOUNDS.minY, BOUNDS.maxY],
                    [svgRef.current?.clientHeight ?? 0, 0]
                  )(point.points_pca[1])}
                  outerRadius={12}
                  innerRadius={6}
                  fill={COLORS[emotion ?? 'neutral']}
                  stroke={theme === 'dark' ? 'white' : 'black'}
                  onMouseOver={(e) => {
                    const node = e.target;
                    node.to({ radius: 8 });
                    const x = node.getStage()?.getPointerPosition()?.x;
                    const y = node.getStage()?.getPointerPosition()?.y;
                    if (x && y) {
                      setTooltip({
                        show: true,
                        x: x + 10, // adjust position as needed
                        y: y,
                        content: point.input,
                        emotion: emotion ?? '',
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.to({ radius: 3 });
                    setTooltip({ ...tooltip, show: false });
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      ) : (
        <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2"></span>
      )}
    </div>
  );
}
