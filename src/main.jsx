import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./Config/AppRoutes.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ChatProvider } from "./Config/ChatContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </HeroUIProvider>
  </StrictMode>
);
