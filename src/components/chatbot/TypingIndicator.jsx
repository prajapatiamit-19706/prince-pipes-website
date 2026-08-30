"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -5 }
  };

  const transition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  return (
    <div className="flex w-full justify-start">
      <div className="bg-surface-2 border border-border-dark rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex space-x-1.5 items-center h-4">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={transition}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ ...transition, delay: 0.15 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ ...transition, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
