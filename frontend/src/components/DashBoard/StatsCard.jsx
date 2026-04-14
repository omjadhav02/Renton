import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition">

  <div>
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className="text-2xl font-semibold text-slate-900 mt-1">{value}</h2>
  </div>

  <div className={`text-3xl ${color}`}>
    {icon}
  </div>

</div>
  );
};

export default StatsCard;