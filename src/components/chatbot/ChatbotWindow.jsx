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

  const chatState = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Chat error:", err);
    }
  });

  console.log("USECHAT EXPORTS:", Object.keys(chatState));

  const {
    messages,
    sendMessage,
    setMessages,
    error,
    stop,
    status
  } = chatState;

  // Auto-loop for tool summaries:
  // If the backend SDK stream finished but only output tool results (no summary),
  // we trigger a hidden manual follow-up to force the summary.
  useEffect(() => {
    if ((status === 'ready' || status === 'error') && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant' && lastMsg.toolInvocations && lastMsg.toolInvocations.length > 0) {
        // Are ALL tools finished?
        const allFinished = lastMsg.toolInvocations.every(t => t.state === 'result');
        if (allFinished) {
           console.log("Triggering auto-follow-up for tool summary!");
           if (sendMessage) {
             sendMessage({ text: "[SYSTEM] Please summarize the information you just retrieved to answer the customer's last question." });
           }
        }
      }
    }
  }, [status, messages, sendMessage]);

  const isLoading = status === "submitted" || status === "streaming";

  const handleClear = () => {
    if (isLoading) stop();
    setMessages([]);
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
      // On mobile it takes full viewport height minus a small margin, on desktop it's a fixed size
      className="fixed z-[60] flex flex-col bg-white shadow-2xl rounded-none md:rounded-2xl border-0 md:border border-border 
                 bottom-0 right-0 w-full h-[100dvh] md:h-[600px] md:w-[400px] md:bottom-24 md:right-6"
      style={{
        // Use inline style for mobile fallback to exact pixels
        height: typeof window !== "undefined" && window.innerWidth < 768 ? windowHeight : undefined
      }}
      role="dialog"
      aria-label="Prince Pipes AI Assistant"
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
