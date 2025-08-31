import { Avatar } from '@heroui/react'
import React from 'react'

const Message = ({msg, currentUser}) => {
  // console.log("Inside message",msg);
  
  return (
    <div className={`flex gap-2 ${msg.sender === currentUser ? "bg-green-600" : "bg-white"} rounded-md w-max max-w-[70%] min-w-[150px] text-black p-2 items-center`}>
        <div>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
        <div> 
            <div className='font-semibold'>{msg.sender}</div>
            <div>{msg.content}</div>
        </div>

    </div>
  )
}

export default Message