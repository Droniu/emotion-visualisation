import { HelloAPIData } from '../app/app';

interface WelcomeProps {
  helloApiData: HelloAPIData | null;
}

export const Welcome = ({ helloApiData }: WelcomeProps) => (
  <div className="flex flex-col justify-center items-center h-full">
    <h1 className="text-3xl font-bold underline">Hello frontend!</h1> <br />
    <p>API data: {helloApiData?.message ?? 'Loading...'}</p>
  </div>
);
