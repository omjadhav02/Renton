import { SiOllama } from "react-icons/si";

const MessageHeader = () => {
  return (
    <div className="px-5 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">

      <div className="flex items-center gap-3">

        {/* ICON CONTAINER */}
        <div className="p-2 rounded-xl bg-indigo-50">
          <SiOllama className="text-xl text-indigo-600" />
        </div>

        <div>
          <h1 className="text-base font-semibold text-slate-900 tracking-tight">
            Renton AI Assistant
          </h1>
          <p className="text-xs text-slate-500">
            Smart help for your bookings & queries
          </p>
        </div>

      </div>

      {/* STATUS */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="w-2 h-2 rounded-full bg-green-500" />
         Mistral from Ollama
      </div>

    </div>
  );
};

export default MessageHeader;