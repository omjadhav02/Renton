import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between hover:border-emerald-500/30 transition">

      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h2 className="text-2xl font-semibold text-white mt-1">{value}</h2>
      </div>

      <div className={`text-3xl ${color}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatsCard;