import { usePayments } from "../../features/payments/hooks/usePayments";


function Transactions() {
  const { payments, loading } = usePayments();

    if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      <div className="space-y-4">
        {payments.map(p => (
          <div
            key={p.id}
            className="bg-slate-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-medium">
                {p.booking.property.title}
              </h2>

              <p className="text-sm text-slate-400">
                {p.booking.property.city}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{p.amount}</p>

              <p className={`text-sm ${
                p.status === "success"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}>
                {p.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;