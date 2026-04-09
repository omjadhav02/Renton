import {
  StatsGrid,
  RequestsTable,
  PropertiesGrid,
  QuickActions,
} from "../../components/DashBoard";
import ChatDrawer from "../../features/chat/components/ChatDrawer";
import { useChat } from "../../features/chat/hooks/useChat";
import { useDashBoard } from "../../hooks/useDashBoard";

const DashBoard = () => {
  
  const { stats, properties, requests, setRequests} = useDashBoard();
  const { openChat, isOpen, chatUser, closeChat } = useChat();

  return (
    <div className="p-6 w-full mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* 🔹 Stats */}
      <StatsGrid stats={stats} />

      {/* 🔹 Requests */}
      <RequestsTable requests={requests} setRequests={setRequests} onChat={openChat}/>

      {/* 🔹 Properties */}
      <PropertiesGrid properties={properties} />

      {/* 🔹 Quick Actions */}
      <QuickActions />

      <ChatDrawer
        isOpen={isOpen}
        user={chatUser}
        onClose={closeChat}
      />

    </div>
  );
};

export default DashBoard;