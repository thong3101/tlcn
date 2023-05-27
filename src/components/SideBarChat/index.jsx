import React from "react";
import Navbar from "../NavbarChat";
import Chats from "../Chats";
import Search from "../SearchChat";

const Sidebar = () => {
  return (
    <div className="sidebar " style={{borderRadius:'20px 0px 0px 20px'}}>
      <Navbar />
      <Chats/>
    </div>
  );
};

export default Sidebar;
