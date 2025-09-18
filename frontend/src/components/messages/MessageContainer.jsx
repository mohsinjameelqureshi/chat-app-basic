import React, { useEffect, useState } from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";
import useConversation from "../../zustand/useConversation.js";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    //clean function unmounts
    return () => setSelectedConversation(null);
  }, []);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center space-x-2">
            <span className="label-text">
              <img
                src={selectedConversation.profilePic}
                alt=""
                className="h-6 w-6 rounded-full"
              />
            </span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullname}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
