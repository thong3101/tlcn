import React, { useContext } from "react";
import Cam from "../../assets/img/cam.png";
import Add from "../../assets/img/add.png";
import More from "../../assets/img/more.png";
import Messages from "../Messages";
import Input from "../Input";
import { ChatContext } from "../../constraints/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat" >
      <div className="chatInfo" style={{borderRadius:'0px 20px 0px 0px'}}>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  );
};

export default Chat;
