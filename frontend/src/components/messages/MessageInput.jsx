import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-0"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
