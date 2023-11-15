import React, { useContext } from 'react';
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';
import themeColors from 'daisyui/src/theming/themes';
 import { DataContext } from '../app/app';
import { useLocalStorage } from '@uidotdev/usehooks';

interface PCAData {
  points_labels: number[];
  points: number[][]
}

export const CanvasPCA = () => {

    const ctx = useContext(DataContext);
    const [pcaData, setPcaData] = React.useState<PCAData | null>(null);
    const [theme] = useLocalStorage('theme', 'dark');
  
    const MAX_POINTS = 500;

    const scatterData = pcaData?.points.slice(0, MAX_POINTS).map((point, index) => ({
      x: point[0],
      y: point[1],
      label: pcaData?.points_labels[index],
  })) || [];

  if (!ctx?.apiData) {
    return null;
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/pca') // Endpoint /pca
      .then((response) => response.json())
      .then((data) => {
        setPcaData({
          points: data.points,
          points_labels: data.points_labels,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

    console.log(scatterData)

    return (
        <ResponsiveContainer width="100%" height="80%">
          <ScatterChart>
            <CartesianGrid
              strokeDasharray="3 3"
              // vertical={false}
              horizontalFill={[
                themeColors[`[data-theme=${theme as 'dark' | 'light'}]`]['base-100'],
                themeColors[`[data-theme=${theme as 'dark' | 'light'}]`]['base-200'],
              ]}
            />
            <XAxis
              dataKey="x"
              type="number"
              name="x"
              tick={{
                fontSize: 9,
                fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`]['base-content'],
                fontFamily: 'sans-serif',
              }}
            />
            <YAxis 
              dataKey="y"
              type="number"
              name="y"
              tick={{
                fontSize: 9,
                fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`]['base-content'],
                fontFamily: 'sans-serif',
              }}/>
              <ZAxis              
              dataKey="label"
              type="number"
              name="label"
              />
            <Tooltip
              cursor={{
                fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`]['base-300'],
                fillOpacity: 0.5,
              }}
            />
            <Legend />
            <Scatter
              name="PCA Points"
              data={scatterData}
              fill={themeColors[`[data-theme=${theme as 'dark' | 'light'}]`].primary}
            />
          </ScatterChart>
        </ResponsiveContainer>
      );

};