import { ChatProvider } from "@/hooks/useChat";
import "./index.css";
import Classing from "./Classing";

export default function Model() {
  return (
    <ChatProvider>
      <Classing />
    </ChatProvider>
  );
}
