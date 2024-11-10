import {
  PopoverBody,
  PopoverButton,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/pop-over";

import { useNavigate } from "react-router-dom";
import {
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
  FloatingPanelBody,
} from "@/components/ui/floating-panel";

import { Image as ImageIcon, Paintbrush, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import IVizLibrary from "../Viz-Library/IVizLibrary";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DoubtModal from "./DoubtModal";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
export default function Toolbar() {
  const [isIVizDialogVisible, setIVizDialogVisible] = useState(false);
  const [isDoubtModalVisible, setDoubtModalVisible] = useState(false);
  // const { timeLeft, isRunning, startCountdown } = WebTrigger();
  const navigate = useNavigate();

  const WS_URL = "ws://localhost:8000";

  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log("WebSocket Connected"),
    shouldReconnect: () => true,
  });

  const startCountdown = () => {
    sendMessage('{"type":"trigger"}'); // Send trigger message
  };

  const handleSubmit = (question) => {
    startCountdown();
  };

  const handleSwitch = () => {
    navigate("/canvas");
  };

  return (
    <div className="border-2 rounded-md border-gray-200 p-2">
      <div className="flex items-center space-x-2">
        <div className="flex place-items-stretch space-x-2">
          <Button className="rounded-md" onClick={handleSwitch}>
            Canvas Mode
          </Button>

          <FloatingPanelRoot>
            <FloatingPanelTrigger
              title="Add Question"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <span>Question</span>
            </FloatingPanelTrigger>
            <FloatingPanelContent className="w-80">
              <FloatingPanelForm onSubmit={handleSubmit}>
                <FloatingPanelBody>
                  <FloatingPanelLabel htmlFor="note-input"></FloatingPanelLabel>
                  <FloatingPanelTextarea
                    id="note-input"
                    className="min-h-[100px]"
                  />
                </FloatingPanelBody>
                <FloatingPanelFooter>
                  <FloatingPanelCloseButton />
                  <FloatingPanelSubmitButton />
                </FloatingPanelFooter>
              </FloatingPanelForm>
            </FloatingPanelContent>
          </FloatingPanelRoot>
          <Button
            className="rounded-md"
            onClick={() => {
              setDoubtModalVisible(true);
            }}
          >
            Ask Doubt
          </Button>
          <Button
            className="rounded-md"
            onClick={() => setIVizDialogVisible(true)}
          >
            Embed IViz
          </Button>
        </div>
        {/* Modal Backdrop - shared between both modals */}
        {(isIVizDialogVisible || isDoubtModalVisible) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        )}

        {/* IVizLibrary Modal */}
        {isIVizDialogVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background w-full max-w-[85vw] max-h-[85vh] rounded-lg shadow-lg overflow-hidden">
              <IVizLibrary />
              <div className="p-4 bg-muted border-t">
                <Button
                  variant="destructive"
                  onClick={() => setIVizDialogVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* DoubtModal */}
        {isDoubtModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background w-full max-w-[85vw] max-h-[85vh] rounded-lg shadow-lg overflow-hidden">
              <DoubtModal onClose={() => setDoubtModalVisible(false)} />
            </div>
          </div>
        )}

        <div>
          <Avatar>
            <AvatarImage></AvatarImage>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
