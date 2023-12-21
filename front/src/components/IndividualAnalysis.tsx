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
import { COLORS } from '../consts';

export const IndividualAnalysis = () => {
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
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={rechartsData} margin={{ bottom: 40 }}>
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
          // tick={{
          //   fontSize: 13,
          //   fill: themeColors[`[data-theme=${theme as 'dark' | 'light'}]`][
          //     'base-content'
          //   ],
          //   fontFamily: 'sans-serif',
          //   transform: 'scaleX(10)',
          // }}
          tick={<CustomTick />}
          angle={30}
          minTickGap={0}
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
        <Legend wrapperStyle={{ bottom: '0%' }} />
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

const CustomTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontSize={12}
        fill={COLORS[payload.value as keyof typeof COLORS]}
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};
