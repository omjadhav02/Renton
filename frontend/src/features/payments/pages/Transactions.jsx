import { usePayments } from "../hooks/usePayments";

function Transactions() {
  const { payments, loading } = usePayments();

  const baseURL = "http://localhost:5000";

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <p className="text-gray-500 animate-pulse">
          Loading transactions...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Transactions
      </h1>

      <div className="max-w-6xl mx-auto space-y-4">
        {payments.map((p) => {
          const image = p.booking.property.images?.[0]?.imageUrl;

          const formattedDate = new Date(p.createdAt).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short", year: "numeric" }
          );

          return (
            <div
              key={p.id}
              className="flex items-center gap-5 p-5 bg-white rounded-2xl 
              shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              {/* IMAGE */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt="property"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 grid md:grid-cols-2 gap-2">
                
                {/* TENANT */}
                <div className="flex items-center gap-3">

                  {/* Info */}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      from,
                    </p>

                    <p className="font-semibold text-gray-800 leading-tight">
                      {p.booking.tenant.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {p.booking.tenant.email}
                    </p>
                  </div>

                </div>

                {/* PROPERTY */}
                <div>
                  <p className="font-medium text-indigo-600">
                    {p.booking.property.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {p.booking.property.city}
                  </p>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ₹{p.amount}
                </p>

                {/* STATUS */}
                <span
                  className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${
                    p.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>

                <p className="text-xs text-gray-400 mt-2">
                  {formattedDate}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {payments.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          No transactions yet
        </div>
      )}
    </div>
  );
}

export default Transactions;