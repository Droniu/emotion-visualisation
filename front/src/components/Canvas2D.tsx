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

export const Canvas2D = () => {
  const ctx = React.useContext(DataContext);
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
  console.log(rechartsData);

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart data={rechartsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill={themeColors['[data-theme=dark]'].primary} />
      </BarChart>
    </ResponsiveContainer>
  );
};
