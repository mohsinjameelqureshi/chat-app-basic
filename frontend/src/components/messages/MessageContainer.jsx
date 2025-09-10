import React, { useState } from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";

const MessageContainer = () => {
  const [chat, setChat] = useState(false);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {chat ? (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">Mohsin Jameel</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;
