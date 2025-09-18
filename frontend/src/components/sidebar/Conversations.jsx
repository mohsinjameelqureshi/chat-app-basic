import React from "react";
import Conversation from "./Conversation.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversation.....", conversations);
  return (
    <div className="py-2 flex flex-col ">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
