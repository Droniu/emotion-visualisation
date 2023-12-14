import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { PromptBar } from './PromptBar';
import { Analysis } from '../app/app';

interface ChildComponentProps {
  analysis: Analysis;
  onAnalysisChange: (selectedOption: Analysis) => void;
  maxPoints: number;
  onMaxPointsChange: (maxPoints: number) => void;
}

export const Navbar: React.FC<ChildComponentProps> = ({
  analysis,
  onAnalysisChange,
  maxPoints,
  onMaxPointsChange,
}) => {
  const options: {
    [key in Analysis]: string;
  } = {
    individual: 'Individual Analysis',
    pca2d: '2D PCA Analysis',
    pca3d: '3D PCA Analysis',
  } as const;

  return (
    <div className="navbar bg-base-100 flex-none">
      <div className="flex-auto">
        <a className="btn btn-ghost normal-case prose-xl" href="/">
          🥰 Emotion Visualisation
        </a>
        <PromptBar analysis={analysis} />
      </div>
      <div className="flex-1"></div>
      <div className="flex-none flex-col flex pr-4">
        <input
          type="range"
          min={1000}
          max={77000}
          value={maxPoints}
          onChange={(e) => onMaxPointsChange(parseInt(e.target.value))}
          className="range range-xs"
          step="1000"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>1k</span>
          <span>20k</span>
          <span>40k</span>
          <span>60k</span>
          <span>77k</span>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            {options[analysis]}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Object.entries(options).map((option) => (
              <li key={option[0]}>
                <a onClick={() => onAnalysisChange(option[0] as Analysis)}>
                  {option[1]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
