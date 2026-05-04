import { useEffect, useState } from "react";
import { getMyProperties } from "../services/propertyService";
import { getBookingRequests } from "../services/bookingService";

export const useDashBoard = () => {

    const [requests, setRequests] = useState([]);
    const [properties, setProperties] = useState([]);
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalRequests: 0,
        pendingRequests: 0,
        totalEarnings: 0,
    });


    const fetchData = async () => {
    try {

      const myRequests = await getBookingRequests();
      const myProperties = await getMyProperties();

      setRequests(myRequests);
      setProperties(myProperties);

      // 🔹 Compute Stats
      const totalProperties = myProperties.length;
      const totalRequests = myRequests.length;
      const pendingRequests = myRequests.filter(
        (r) => r.status === "pending"
      ).length;

      const totalEarnings = myRequests.reduce((sum, r) => {
        if (r.status === "approved" && r.payment?.amount) {
          return sum + r.payment.amount;
        }
        return sum;
      }, 0);;

      

      setStats({
        totalProperties,
        totalRequests,
        pendingRequests,
        totalEarnings,
      });

    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { requests, setRequests, properties, setProperties, stats, setStats }
}