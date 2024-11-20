"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <Terminal className="w-16 h-16 mx-auto mb-6 text-green-400" />
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Node.js Starter
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        A modern foundation for your next Node.js project, powered by Next.js and TypeScript
      </p>
    </motion.div>
  );
}