import RequestCard from "./RequestCard";

const RequestList = ({ requests, onApprove, onReject, onChat, onDelete }) => {
  if (requests.length === 0) {
    return (
      <div className="mt-10 p-10 text-center rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40">
        <p className="text-gray-500">No booking requests yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onApprove={onApprove}
          onReject={onReject}
          onChat={onChat}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RequestList;