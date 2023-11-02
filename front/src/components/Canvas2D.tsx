import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { DataContext } from '../app/app';
import themeColors from 'daisyui/src/theming/themes';
import { useLocalStorage } from '@uidotdev/usehooks';

export const Canvas2D = () => {
  const ctx = React.useContext(DataContext);
  const [theme] = useLocalStorage('theme', 'dark');

  if (!ctx?.apiData) {
    // This should never happen xD
    return null;
  }
  const rechartsData = Object.entries(ctx.apiData.labels).map(
    ([key, value]) => ({
      name: key,
      score: value,
    })
  );

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart data={rechartsData}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontalFill={[
            themeColors[`[data-theme=${theme as 'dark' | 'light'}]`][
              'base-100'
            ],
            themeColors[`[data-theme=${theme as 'dark' | 'light'}]`][
              'base-200'
            ],
          ]}
        />
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 9,
            fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`][
              'base-content'
            ],
            fontFamily: 'sans-serif',
          }}
        />
        <YAxis />
        <Tooltip
          cursor={{
            fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`][
              'base-300'
            ],
            fillOpacity: 0.5,
          }}
        />
        <Legend />
        <Bar
          dataKey="score"
          fill={
            themeColors[`[data-theme=${theme as 'dark' | 'light'}]`].primary
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
