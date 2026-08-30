"use client";

import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

export default function ChatbotLauncher({ isOpen, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </motion.button>
  );
}
