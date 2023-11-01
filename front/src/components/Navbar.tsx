import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <a className="btn btn-ghost normal-case text-x" href="/">
          Emotion Visualisation
        </a>
        <input
          type="text"
          placeholder="Add new prompt..."
          className="input input-bordered input-sm w-full max-w-xl ml-4 mr-4"
        />
        <button className="btn btn-sm btn-primary">
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
