"use client";

import { motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

export default function ChatbotWindow({ onClose }) {
  // Mobile viewport height fix
  const [windowHeight, setWindowHeight] = useState("100dvh");

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [input, setInput] = useState("");
  const [initialMessages] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("prince-pipes-chat");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const chatState = useChat({
    api: "/api/chat",
    messages: initialMessages,
    onError: (err) => {
      console.error("Chat error:", err);
    }
  });

  const {
    messages,
    sendMessage,
    setMessages,
    error,
    stop,
    status
  } = chatState;

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("prince-pipes-chat", JSON.stringify(messages));
    }
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  const handleClear = () => {
    if (isLoading) stop();
    setMessages([]);
    sessionStorage.removeItem("prince-pipes-chat");
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (sendMessage) {
      sendMessage({ text: input.trim() });
    }
    setInput("");
  };

  const handleAppend = (content) => {
    const textStr = typeof content === 'object' && content.content ? content.content : content;
    if (sendMessage) {
      sendMessage({ text: textStr });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed z-[9999] flex flex-col bg-white shadow-2xl rounded-2xl border border-border 
                 bottom-20 right-4 w-[calc(100%-32px)] sm:w-[400px] h-[75dvh] max-h-[600px] md:bottom-24 md:right-6 md:h-[600px]"
      role="dialog"
      aria-label="Prince Pipes & Fittings AI Assistant"
    >
      <ChatHeader onClose={onClose} onClear={handleClear} />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        append={handleAppend}
        error={error}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </motion.div>
  );
}
