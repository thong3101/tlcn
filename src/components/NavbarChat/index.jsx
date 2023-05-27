import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
// import { auth } from '../../firebase'
// import { AuthContext } from '../context/AuthContext'
import { useSelector } from "react-redux";

const NavbarChat = () => {
  // const {currentUser} = useContext(AuthContext)
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className='navbar' style={{borderRadius:'20px 0px 0px 0px'}} >
      <span className="logo">Senki Chat</span>
      <div className="user">
        <img src={currentUser?.img||'https://res.cloudinary.com/dddmdgm0w/image/upload/v1663855039/cld-sample-5.jpg'} alt="" />
        <span>{currentUser.nickName}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default NavbarChat