import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import JoinRoom from "../pages/room/JoinRoom";
import Chat from "../Pages/Chat/Chat";
import Signup from "../pages/signup/signup";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="room" element={<JoinRoom />} />
        <Route path="chat" element={<Chat />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
