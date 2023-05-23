import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
// import { auth } from '../../firebase'
// import { AuthContext } from '../context/AuthContext'
import { useSelector } from "react-redux";

const NavbarChat = () => {
  // const {currentUser} = useContext(AuthContext)
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt="" />
        <span>{currentUser.nickName}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default NavbarChat