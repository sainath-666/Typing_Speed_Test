import React from 'react';

const RestartButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-6 px-6 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-md hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
    >
      {disabled ? 'Loading...' : 'New Test'}
    </button>
  );
};

export default RestartButton;