import { Button, Input } from "@heroui/react";
import { FolderPlus, SendHorizontal } from "lucide-react";
import { MdOutlineAttachment } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import Message from "../../Components/Message";
import useChatContext from "../../Config/ChatContext";
import axiosClient from "../../Config/axiosClient";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [inputMessage, setInputMessage] = useState("");

  const {
    roomId,
    setRoomId,
    currentUser,
    setCurrentUser,
    connected,
    setConnected,
  } = useChatContext();

  const naviagate = useNavigate();

  // redirect to room page if refresh chat page
  useEffect(() => {
    if (!connected) {
      naviagate("/room");
    }
  }, [roomId, currentUser, connected]);

  // leads the messages when components loads
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await axiosClient.get(`rooms/${roomId}/messages`);
        // console.log(messages.data);
        setMessages(messages.data);
      } catch (error) {
        console.log("Error in chat page: ", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  // stomp client connection

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS("http://localhost:8080/chat");
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);

        console.log("Connected successfully");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          // console.log("Messages: ", message);

          const newMessages = JSON.parse(message.body);
          setMessages((pre) => [...pre, newMessages]);
        });

        console.log("stompClient:", stompClient);
        console.log("connected:", connected);
      });
    };

    if (connected) connectWebSocket();
  }, [roomId]);

  // send messages

  const handleSend = async () => {
    // console.log("stompClient:", stompClient);
    // console.log("connected:", connected);
    if (stompClient && connected && inputMessage.trim()) {
      // console.log("Input message: ", inputMessage);

      const msg = {
        roomId: roomId,
        content: inputMessage,
        sender: currentUser,
      };

      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(msg));
      setInputMessage("");
    }
  };

  return (
    <div className="w-screen h-svh flex flex-col justify-between">
      {/* // Navbar */}
      <div className="w-full flex px-8 justify-between h-16 items-center bg-gray-600 z-10 ">
        <div>Room ID: {roomId}</div>
        <div>User: {currentUser}</div>
        <div>
          <Button color="danger">Leave Room</Button>
        </div>
      </div>

      {/* // chat  */}
      <div
        className={`bg-gray-500 flex-1 overflow-y-scroll scrollbar-hide p-3 flex gap-2 flex-col`}
      >
        {messages.map((msg, index) => {
          // console.log("Msg: ", msg);

          return (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* // return <div className="flex justify-end">  */}
              <Message key={index} msg={msg} currentUser={currentUser} />
            </div>
          );
        })}
      </div>

      {/* Input  */}
      <div className="bg-gray-600 h-16 flex gap-5 items-center px-8">
        <Input
          type="text"
          className="text-black"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => {
            e.preventDefault();
            setInputMessage(e.target.value);
          }}
        />

        <div
          className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-gray-400"
          onClick={handleSend}
        >
          <MdOutlineAttachment size={25} />
        </div>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-gray-400"
          onClick={handleSend}
        >
          <LuSendHorizontal size={25} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
