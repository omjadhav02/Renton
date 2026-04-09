import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-2xl p-5">
      
      <h2 className="text-lg font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={() => navigate("/owner/create-property")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Property
        </button>

        <button
          onClick={() => navigate("/owner/requests")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          View Requests
        </button>

        <button
          onClick={() => navigate("/owner/my-properties")}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Manage Properties
        </button>

      </div>

    </div>
  );
};

export default QuickActions;