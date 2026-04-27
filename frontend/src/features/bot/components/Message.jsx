import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessageBox from "./MesssageBox";
import { useBot } from "../hooks/useBot";

const Message = () => {
  const { input, setInput, messages, loading, sendMessage } = useBot();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex justify-center overflow-hidden">

      {/* CENTERED CONTAINER */}
      <div className="w-full max-w-3xl flex flex-col h-screen overflow-hidden max-h-[600px]">

        <MessageHeader />

        <MessageBox messages={messages} loading={loading} />

        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />

      </div>
    </div>
  );
};

export default Message;