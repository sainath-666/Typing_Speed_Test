import React from "react";

const StatCard = ({ label, value, colorClass }) => {
  return (
    <div className="bg-slate-900/80 p-4 rounded-lg text-center transition-all duration-300 backdrop-blur-sm">
      <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">
        {label}
      </div>
      <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
    </div>
  );
};

function StatsDisplay({ wpm, accuracy, timer }) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
      <StatCard
        label="WPM"
        value={Math.round(wpm)}
        colorClass="text-blue-500"
      />
      <StatCard
        label="Accuracy"
        value={`${accuracy.toFixed(1)}%`}
        colorClass="text-green-400"
      />
      <StatCard label="Time" value={timer} colorClass="text-yellow-400" />
    </div>
  );
}

export default StatsDisplay;
