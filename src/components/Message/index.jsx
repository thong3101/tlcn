import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { ChatContext } from "../../constraints/ChatContext";

const Message = ({ message }) => {
  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useContext(ChatContext);
  console.log(currentUser);

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
              ? currentUser.img
              : data.user.photoURL
          }
          alt=""
        />
        <span style={{color:'white!important'}}>
          {message.senderId === currentUser.id
            ? currentUser.nickName
            : data.user.displayName}
        </span>
      </div>
      <div className="messageContent">
        {message.text && (
          <p
            style={{
              fontSize: "16px!important",
              backgroundColor: "black!important",
            }}
          >
            {message.text}
          </p>
        )}
        {message.img && (
          <img
            src={message.img}
            alt=""
            style={{ borderRadius: "10px", maxBlockSize: "300px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
