import React, { useContext, useEffect, useState } from "react";
import Attach from "../../assets/img/attach.png";
import Img from "../../assets/img/img.png";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Button from "@mui/material/Button";
// import { AuthContext } from "../context/AuthContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../constraints/ChatContext";
import { db, storage } from "../../firebase";


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useContext(ChatContext);

  const [image, setImage] = React.useState(""); //url setting state
  useEffect(()=>{
    if(image){
      updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.id,
          date: Timestamp.now(),
          img: image,
        }),
      });
    }
   
  },[image])



  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          
        }, 
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImage(downloadURL)
           
          })}
       
      );
     
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.id), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    
  };

  

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <label src={Attach} alt="" htmlFor="file" >
            <AttachFileIcon/>
          </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
     
       <IconButton onClick={handleSend} color="primary" style={{background:'none',color:'#38bdf8  '}}>
          <SendIcon />
       </IconButton>
        
      </div>
    </div>
  );
};

export default Input;
