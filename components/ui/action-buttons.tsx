"use client";

import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-center"
    >
      <div className="space-x-4">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={() => window.open("https://github.com", "_blank")}
        >
          <Github className="mr-2 h-5 w-5" />
          View on GitHub
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          onClick={() => window.open("https://nodejs.org", "_blank")}
        >
          <Globe className="mr-2 h-5 w-5" />
          Documentation
        </Button>
      </div>
    </motion.div>
  );
}