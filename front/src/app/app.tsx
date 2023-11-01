import React from 'react';
import { Navbar } from '../components/Navbar';

import { EMOTIONS } from '../consts';
import { Welcome } from '../components/Welcome';
import { Canvas2D } from '../components/Canvas2D';

export interface HelloAPIData {
  message: string;
}
type Labels = {
  [Property in keyof typeof EMOTIONS]: number;
};
interface APIData {
  labels: Labels;
  logits: number[];
}
type TAPIState = {
  apiData: APIData | null;
  setApiData: React.Dispatch<React.SetStateAction<APIData | null>>;
};
export const DataContext = React.createContext<TAPIState | null>(null);

export function App() {
  const [helloApiData, setHelloApiData] = React.useState<HelloAPIData | null>(
    null
  );
  const [apiData, setApiData] = React.useState<APIData | null>(null);

  // fetch data from api and store in helloApiData state
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://127.0.0.1:8000');
      const data = await result.json();
      setHelloApiData(data);
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log(helloApiData);
  }, [helloApiData]);

  return (
    <DataContext.Provider value={{ apiData, setApiData }}>
      <Navbar />
      {apiData ? <Canvas2D /> : <Welcome helloApiData={helloApiData} />}
    </DataContext.Provider>
  );
}

export default App;
