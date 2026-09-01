"use client";

import { useState, useEffect } from "react";
import ChatbotLauncher from "./ChatbotLauncher";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ChatbotWindow = dynamic(() => import("./ChatbotWindow"), { ssr: false });

export default function ChatbotContainer() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling on the body when chatbot is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden", "md:overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    }
    return () => {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    };
  }, [isOpen]);

  return (
    <>
      <ChatbotLauncher isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
