import React from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?.data?.user?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? authUser?.data?.user?.profilePic
    : selectedConversation?.profilePic;

  const bubbleBGColor = fromMe ? "bg-blue-500" : "";

  const formatedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBGColor} rounded-2xl`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
