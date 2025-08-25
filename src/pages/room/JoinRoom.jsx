import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "../../Config/axiosClient";

const JoinRoom = () => {

  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleRoomChange = (e) => {
    e.preventDefault();
    setRoomId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Room ID: ", roomId);

    const formData = {
      name,
      roomId
    }

    const data = axiosClient.post("/", formData);
    
  }

  const handleCreateRoom = () => {
    navigate("/room/create");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[400px] bg-gray-700 p-8 flex flex-col gap-8 rounded-sm">
        <div className="text-center">
          <p className="text-3xl font-bold">Join Room</p>
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <Input 
              type="text" 
              name="name"
              label="Name" 
              placeholder="Enter Your Name" 
              onChange={handleNameChange}
              value={name}
            />
            <Input 
              type="text" 
              name="roomId"
              label="Room Id" 
              placeholder="Enter Room ID"
              onChange={handleRoomChange}
              value={roomId}
            />
          </div>

          <div className="flex gap-5 justify-between">
            <Button color="success" type="submit">Join Room</Button>
            <Button color="primary" onPress={handleCreateRoom}>Create Room</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
