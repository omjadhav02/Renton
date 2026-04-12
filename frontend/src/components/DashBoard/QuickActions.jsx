import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

  <h2 className="text-lg font-semibold text-white mb-4">
    Quick Actions
  </h2>

  <div className="flex flex-wrap gap-3">

    <button
      onClick={() => navigate("/owner/create-property")}
      className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
    >
      Add Property
    </button>

    <button
      onClick={() => navigate("/owner/requests")}
      className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:border-emerald-500 transition"
    >
      View Requests
    </button>

    <button
      onClick={() => navigate("/owner/my-properties")}
      className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:border-emerald-500 transition"
    >
      Manage Properties
    </button>

  </div>

</div>
  );
};

export default QuickActions;