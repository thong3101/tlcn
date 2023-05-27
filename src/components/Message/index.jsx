import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { ChatContext } from "../../constraints/ChatContext";
import moment from "moment";

const Message = ({ message }) => {
  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useContext(ChatContext);
  console.log(currentUser);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(message)
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.id && currentUser.img
              ? currentUser.img
              : 'https://res.cloudinary.com/dddmdgm0w/image/upload/v1685204500/senki_avatar/senki_avatar/19110376%40student.hcmute.edu.vn.jpg'
          }
          alt=""
        />
        {/* <span style={{color:'white!important'}}>
          {message.senderId === currentUser.id
            ? currentUser.nickName
            : data.user.displayName}
        </span> */}
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
         {message.date && (
          <span style={{ fontSize: "12px",color:'gray' }} >
            {/* {new Date(message.date?.toDate()).toLocaleString()} */}
            {moment(message.date?.toDate()).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
