import { useState, useEffect, useCallback } from "react";
import useWebSocket from "react-use-websocket";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const WS_URL = "ws://localhost:8000";

export default function WebSocketDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [doubt, setDoubt] = useState("");

  const { lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log("WebSocket Connected"),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (
      lastMessage !== null &&
      JSON.parse(lastMessage.data).type === "showDialog"
    ) {
      setIsOpen(true);
      setTimeLeft(60); // Reset timer
    }
  }, [lastMessage]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when timer runs out
    }
  }, [isOpen, timeLeft]);

  const handleSubmit = useCallback(async () => {
    if (doubt.trim() === "") {
      console.warn("No doubt entered, skipping submission.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: doubt }),
      });
      if (!response.ok) throw new Error("Failed to send data");
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsOpen(false);
      setDoubt(""); // Clear the doubt input
      setTimeLeft(60); // Reset timer
    }
  }, [doubt]);

  const handleClose = () => {
    handleSubmit(); // Trigger submit on manual close
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student View Screen</h1>
      <p>Connected to Class Room K22CL</p>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Enter your doubt</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="mb-2">Time left: {timeLeft} seconds</p>
            <Textarea
              placeholder="Enter your doubt here..."
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              className="w-full mb-4"
            />
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
