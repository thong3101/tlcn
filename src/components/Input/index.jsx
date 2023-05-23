import React, { useContext, useState, useEffect } from "react";
import Img from "../../assets/img/img.png";
import Attach from "../../assets/img/attach.png";
// import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../../constraints/ChatContext";
import { useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // const { currentUser } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useContext(ChatContext);

  const [imageUpload, setImageUpload] = React.useState(null); // image selecting state
  const [image, setImage] = React.useState(""); //url setting state


  // useEffect(() => {
  //   // declare the data getImage function
  //   const getImage = async () => {
  //     const ImageURL = await getDownloadURL(ref(storage, uuid()));
  //     setImage(ImageURL);
  //   }
  //   // call the function
  //   getImage()
  //   console.log(image)
  // }, [imageUpload])

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (error) => {
          //TODO:Handle Error
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("2",downloadURL)
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
      // uploadBytesResumable(storageRef, imageUpload).then(async (snapshot) => {
      //   console.log("Uploaded image");
      //   console.log("2",snapshot)
      //   await updateDoc(doc(db, "chats", data.chatId), {
      //     messages: arrayUnion({
      //       id: uuid(),
      //       text,
      //       senderId: currentUser.id,
      //       date: Timestamp.now(),
      //       img: snapshot,
      //     }),
      //   });
      // });
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
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
