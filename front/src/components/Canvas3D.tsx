import {
  OrbitControls,
  PointMaterial,
  Points,
  useTexture,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React from 'react';
import { Vector3 } from 'three';
import { DataContext } from '../app/app';
import { COLORS, RAW_COLORS } from '../consts';
import { findKeyOfMaxValue } from '../utils';
import { PCAData, UserPoints } from './Canvas2D';
import { Legend } from './Legend';

interface Canvas3DProps {
  maxPoints: number;
}

export const Canvas3D = ({ maxPoints }: Canvas3DProps) => {
  const [pcaData, setPcaData] = React.useState<PCAData | null>(null);
  const [userPoints, setUserPoints] = React.useState<UserPoints[] | null>(null);

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/pca?dimensions=3')
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
  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/savedText?dimensions=3')
      .then((response) => response.json())
      .then((data) => {
        setUserPoints(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [ctx]);

  return (
    <>
      <div id="pca3d" className="grow w-full pv-12 relative">
        {pcaData && (
          <Canvas>
            <axesHelper args={[20]} />
            <axesHelper args={[-20]} />
            <CameraPositioner position={[-40, 15, 35]} zoom={0.6} />
            <DynamicPoints
              pcaData={pcaData}
              maxPoints={maxPoints}
              key={maxPoints} // Key based on maxPoints
            />
            {userPoints && (
              <CustomPoints
                userPoints={userPoints}
                key={maxPoints + 'custom'}
              />
            )}
            <OrbitControls />
          </Canvas>
        )}
      </div>
      <Legend />
    </>
  );
};

const DynamicPoints = ({
  pcaData,
  maxPoints,
}: {
  pcaData: PCAData;
  maxPoints: number;
}) => {
  const geometrySource = pcaData.points.flat();
  const colorSource = pcaData.points_labels.flatMap(
    (label: number) => RAW_COLORS[label]
  );
  const vertices = new Float32Array(maxPoints * 3);
  const colors = new Float32Array(maxPoints * 3);

  for (let i = 0; i < maxPoints * 3; i++) {
    vertices[i] = geometrySource[i];
    colors[i] = colorSource[i];
  }

  return (
    <Points positions={vertices} colors={colors}>
      <PointMaterial
        size={0.1}
        transparent={true}
        sizeAttenuation
        depthWrite={false}
        vertexColors
      />
    </Points>
  );
};

const CustomPoints = ({ userPoints }: { userPoints: UserPoints[] }) => {
  const texture = useTexture('/star_texture.png');
  const geometrySource = userPoints.flatMap((point) => point.points_pca);
  const colorSource = userPoints.flatMap((point) => {
    const emotion = findKeyOfMaxValue(point.labels) ?? 'neutral';
    const index = Object.keys(COLORS).indexOf(emotion);
    return RAW_COLORS[index];
  });

  const vertices = new Float32Array(userPoints.length * 3);
  const colors = new Float32Array(userPoints.length * 3);

  for (let i = 0; i < userPoints.length * 3; i++) {
    vertices[i] = geometrySource[i];
    colors[i] = colorSource[i];
  }

  return (
    <Points positions={vertices} colors={colors}>
      <PointMaterial
        alphaMap={texture}
        alphaTest={0.5}
        size={2}
        transparent={true}
        sizeAttenuation
        depthWrite={false}
        vertexColors
      />
    </Points>
  );
};

const CameraPositioner = ({
  position,
  zoom = 1,
}: {
  position: [number, number, number];
  zoom?: number;
}) => {
  const { camera } = useThree();
  const zoomedPosition = new Vector3(...position).multiplyScalar(zoom);

  React.useEffect(() => {
    camera.position.set(zoomedPosition.x, zoomedPosition.y, zoomedPosition.z);
    camera.updateProjectionMatrix();
  }, [position, camera]);

  return null;
};
