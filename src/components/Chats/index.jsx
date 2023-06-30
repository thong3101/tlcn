import { doc, onSnapshot } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { ChatContext } from "../../constraints/ChatContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);

  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { dispatch } = useContext(ChatContext);
  const history=useNavigate()
  const getChats=useCallback(()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub();
    };
  },[currentUser.id])
  useEffect(() => {
    // getChats();
    currentUser.id && getChats();
  }, [currentUser.id,history]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats " >
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo?.photoURL||'https://res.cloudinary.com/dddmdgm0w/image/upload/v1685204500/senki_avatar/senki_avatar/19110376%40student.hcmute.edu.vn.jpg'} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p >{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
