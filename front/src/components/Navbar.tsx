import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { PromptBar } from './PromptBar';


export const Navbar = () => {
  const options = ['Opcja 1', 'Opcja 2'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const HiddenComponent = () => {
    if (selectedOption === 'Individual Analysis') {
      return <PromptBar></PromptBar>;
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-auto">
        <a className="btn btn-ghost normal-case prose-xl" href="/">
          🥰 Emotion Visualisation
        </a>
        <HiddenComponent></HiddenComponent>
      </div>
      <div className="flex-1"></div>
      <div className="flex-none">
      <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">{selectedOption}</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {options.map((option) => (
              <li>
                <a onClick={() => handleSelect(option)}> {option}</a>
              </li>
            ))}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
