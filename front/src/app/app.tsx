import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

import { EMOTIONS } from '../consts';
import { Welcome } from '../components/Welcome';
import { IndividualAnalysis } from '../components/IndividualAnalysis';
import { Canvas2D } from '../components/Canvas2D';
import { Canvas3D } from '../components/Canvas3D';

export interface HelloAPIData {
  message: string;
}
export type Labels = {
  [Property in keyof typeof EMOTIONS]: number;
};
interface APIData {
  labels: Labels;
  logits: number[];
}
type AppContext = {
  apiData: APIData | null;
  setApiData: React.Dispatch<React.SetStateAction<APIData | null>>;
};

export type Analysis = 'individual' | 'pca2d' | 'pca3d';

export const DataContext = React.createContext<AppContext | null>(null);

export function App() {
  const [apiData, setApiData] = React.useState<APIData | null>(null);
  const [maxPoints, setMaxPoints] = useState(5000);
  const [chartAnalysis, setChartAnalysis] = useState<Analysis>('individual');

  return (
    <DataContext.Provider value={{ apiData, setApiData }}>
      <div className="h-full flex flex-col justify-start items-center">
        <Navbar
          analysis={chartAnalysis}
          onAnalysisChange={(val: Analysis) => setChartAnalysis(val)}
          maxPoints={maxPoints}
          onMaxPointsChange={setMaxPoints}
        />
        {apiData === null && chartAnalysis === 'individual' && <Welcome />}
        {chartAnalysis === 'individual' && <IndividualAnalysis />}
        {chartAnalysis === 'pca2d' && <Canvas2D maxPoints={maxPoints} />}
        {chartAnalysis === 'pca3d' && <Canvas3D maxPoints={maxPoints} />}
      </div>
    </DataContext.Provider>
  );
}

export default App;
