import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
<div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

  <h2 className="text-lg font-semibold text-slate-900 mb-4">
    Quick Actions
  </h2>

  <div className="flex flex-wrap gap-3">

    <button
      onClick={() => navigate("/owner/create-property")}
      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
    >
      Add Property
    </button>

    <button
      onClick={() => navigate("/owner/requests")}
      className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition"
    >
      View Requests
    </button>

    <button
      onClick={() => navigate("/owner/my-properties")}
      className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition"
    >
      Manage Properties
    </button>

  </div>

</div>
  );
};

export default QuickActions;