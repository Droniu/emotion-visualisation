import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { DataContext } from '../app/app';

export const Navbar = () => {
  const [prompt, setPrompt] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const ctx = React.useContext(DataContext);

  const handleAddPrompt = () => {
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
    <div className="navbar bg-base-100">
      <div className="flex-auto">
        <a className="btn btn-ghost normal-case text-x" href="/">
          Emotion Visualisation
        </a>
        <input
          type="text"
          placeholder="Add new prompt..."
          className="input input-bordered input-sm w-full max-w-xl ml-4 mr-4"
          onChange={handlePromptChange}
        />
        <button
          className="btn btn-sm btn-primary"
          disabled={loading}
          onClick={handleAddPrompt}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
          Add
        </button>
      </div>
      <div className="flex-1"></div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
};
