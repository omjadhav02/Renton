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
  
  const { stats, properties, requests, setRequests } = useDashBoard();
  const { openChat, isOpen, chatUser, closeChat } = useChat();

  return (
    <div className="w-full mx-auto space-y-8">

  <div>
    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
      Dashboard
    </h1>
    <p className="text-slate-500 text-sm">
      Overview of your properties and activity
    </p>
  </div>

  <StatsGrid stats={stats} />

  <RequestsTable
    requests={requests}
    setRequests={setRequests}
    onChat={openChat}
  />

  <PropertiesGrid properties={properties} />

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