import {
  PopoverBody,
  PopoverButton,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverHeader,
  PopoverLabel,
  PopoverRoot,
  PopoverSubmitButton,
  PopoverTextarea,
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

export default function Toolbar() {
  const [isIVizDialogVisible, setIVizDialogVisible] = useState(false);
  const [isDoubtModalVisible, setDoubtModalVisible] = useState(false);
  const navigate = useNavigate();
  const QuickActionsPopover = () => {
    const actions = [
      {
        icon: <Plus className="w-4 h-4" />,
        label: "Doubt",
        action: () => setDoubtModalVisible(true),
      },
      {
        icon: <ImageIcon className="w-4 h-4" />,
        label: "Embed",
        action: () => setIVizDialogVisible(true),
      },
      {
        icon: <Paintbrush className="w-4 h-4" />,
        label: "Nudge",
        action: () => console.log("Nudge"),
      },
    ];

    return (
      <PopoverRoot>
        <PopoverTrigger>Quick Actions</PopoverTrigger>
        <PopoverContent className="">
          <PopoverHeader>Quick Actions</PopoverHeader>
          <PopoverBody>
            {actions.map((action, index) => (
              <PopoverButton key={index} onClick={action.action}>
                {action.icon}
                <span>{action.label}</span>
              </PopoverButton>
            ))}
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    );
  };

  const handleSubmit = (question) => {
    console.log("Submitted note:", question);
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
          <QuickActionsPopover />
        </div>
        {isIVizDialogVisible && (
          <>
            {/* Background blur overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50" />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[85vw] max-h-[85vh] transform transition-all duration-300 ease-in-out">
                <IVizLibrary />
                <Button
                  variant={"destructive"}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => setIVizDialogVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
        {isDoubtModalVisible && (
          <>
            {/* Background blur overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50" />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[85vw] max-h-[85vh] transform transition-all duration-300 ease-in-out">
                <DoubtModal />
                <Button
                  variant={"destructive"}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => setIVizDialogVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
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
