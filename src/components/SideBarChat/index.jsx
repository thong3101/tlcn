import React from "react";
import Navbar from "../NavbarChat";
import Chats from "../Chats";
import Search from "../SearchChat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Chats/>
    </div>
  );
};

export default Sidebar;
