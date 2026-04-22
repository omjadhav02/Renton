import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessageBox from "./MesssageBox";
import { useBot } from "../hooks/useBot";

const Message = () => {
  const { input, setInput, messages, loading, sendMessage } = useBot();

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100">
      <MessageHeader />

      <MessageBox messages={messages} loading={loading} />

      <MessageInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
};

export default Message;