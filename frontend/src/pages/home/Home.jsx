import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-xl bg-white/5 backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
