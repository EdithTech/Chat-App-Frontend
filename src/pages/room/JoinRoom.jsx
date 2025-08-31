import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import axiosClient from "../../Config/axiosClient";
import useChatContext from "../../Config/ChatContext";
import { useNavigate } from "react-router";

const JoinRoom = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    e.preventDefault();
    setRoomId(e.target.value);
  };

  const navigate = useNavigate();

  const {
    roomId: storedRoomId,
    setRoomId: setStoredRoomId,
    currentUser,
    setCurrentUser,
    connected,
    setConnected,
  } = useChatContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Room ID: ", roomId);

    try {
      const data = axiosClient.get(`/rooms/${roomId}`);

      console.log("Room Created Successfully");
      console.log("Data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCreateRoom = async () => {
    const res = await axiosClient.post("/rooms", roomId);
    console.log("Res: ", res);

    setStoredRoomId(roomId);
    setCurrentUser(name);
    setConnected(true);

    navigate("/chat");

    // handleJoinRoom(roomId, name);
  };

  const handleJoinRoom = async () => {
    try {
      const res = await axiosClient.get(`/rooms/${roomId}`);
      console.log("Res: ", res);

      setStoredRoomId(res.data.roomId);
      setCurrentUser(name);
      setConnected(true);

      navigate("/chat");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[400px] bg-gray-700 p-8 flex flex-col gap-8 rounded-sm">
        <div className="text-center">
          <p className="text-3xl font-bold">Join Room</p>
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 text-black">
            <Input
              required
              type="text"
              name="name"
              label="Name"
              placeholder="Enter Your Name"
              onChange={handleNameChange}
              value={name}
            />
            <Input
              required
              type="text"
              name="roomId"
              label="Room Id"
              placeholder="Enter Room ID"
              onChange={handleRoomChange}
              value={roomId}
            />
          </div>

          <div className="flex gap-5 justify-between">
            <Button color="success" onPress={handleJoinRoom}>
              Join Room
            </Button>
            <Button color="primary" onPress={handleCreateRoom}>
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
