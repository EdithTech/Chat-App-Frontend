import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import JoinRoom from "../pages/room/JoinRoom";
import Chat from "../Pages/Chat/Chat";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="room" element={<JoinRoom />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
