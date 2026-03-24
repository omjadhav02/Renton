import RequestCard from "./RequestCard";

const RequestList = ({ requests, onApprove, onReject, onChat }) => {
  if (requests.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No booking requests yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onApprove={onApprove}
          onReject={onReject}
          onChat={onChat}
        />
      ))}
    </div>
  );
};

export default RequestList;