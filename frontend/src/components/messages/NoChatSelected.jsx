import React from "react";
import { TiMessage } from "react-icons/ti";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 Mohsin Jameel 💮</p>
        <p>Select a chat to start messaging</p>
        <TiMessage className="h-6 w-6" />
      </div>
    </div>
  );
};

export default NoChatSelected;
