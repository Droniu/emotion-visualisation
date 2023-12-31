import React from 'react';
import { Analysis, DataContext } from '../app/app';

interface PromptBarProps {
  analysis: Analysis;
}

export const PromptBar = ({ analysis }: PromptBarProps) => {
  const [prompt, setPrompt] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const ctx = React.useContext(DataContext);

  const handleAnalyzePrompt = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/inputText', {
      method: 'POST',
      body: JSON.stringify({ text: prompt }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!ctx?.setApiData) {
          throw new Error('Context not found');
        }
        ctx.setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="navbar flex-auto">
      <input
        type="text"
        placeholder="Type new prompt..."
        className="input input-bordered input-sm w-full max-w-xl ml-4 mr-4"
        onChange={handlePromptChange}
      />
      <button
        className="btn btn-sm btn-primary"
        disabled={loading || !prompt}
        onClick={handleAnalyzePrompt}
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        )}
        {analysis === 'individual' ? ' Analyze' : ' Add'}
      </button>
    </div>
  );
};
