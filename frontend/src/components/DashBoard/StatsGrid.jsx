import React from "react";
import StatsCard from "./StatsCard";

import { FaHome } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      
      <StatsCard
        title="Total Properties"
        value={stats.totalProperties}
        icon={<FaHome />}
        color="text-blue-500"
      />

      <StatsCard
        title="Total Requests"
        value={stats.totalRequests}
        icon={<FaClipboardList />}
        color="text-green-500"
      />

      <StatsCard
        title="Pending Requests"
        value={stats.pendingRequests}
        icon={<FaClock />}
        color="text-yellow-500"
      />

      <StatsCard
        title="Total Earnings"
        value={`₹${stats.totalEarnings || 0}`}
        icon={<FaRupeeSign />}
        color="text-purple-500"
      />

    </div>
  );
};

export default StatsGrid;