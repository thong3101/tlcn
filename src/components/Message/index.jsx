import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { ChatContext } from "../../constraints/ChatContext";

const Message = ({ message }) => {
  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.id
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>
          {message.senderId === currentUser.id
            ? currentUser.nickName
            : data.user.displayName}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
