// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import styles from './app.module.css';

// import NxWelcome from './nx-welcome';

interface APIData {
  message: string;
}

export function App() {
  const [apiData, setApiData] = React.useState<APIData | null>(null);

  // fetch data from api and store in apiData state
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://127.0.0.1:8000');
      const data = await result.json();
      setApiData(data);
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log(apiData);
  }, [apiData]);
  return (
    <div>
      <h1>Hello frontend!</h1>
      <p>API data: {apiData?.message ?? 'Loading...'}</p>
    </div>
  );
}

export default App;
