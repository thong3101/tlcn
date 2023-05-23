import React from 'react'
import SideBarChat from '../../components/SideBarChat'
import Chat from '../../components/Chat'
import './ChatArea.scss'

const ChatArea = () => {
  return (
    <div className='homeChat'>
      <div className="container">
        <SideBarChat/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatArea