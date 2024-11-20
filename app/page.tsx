"use client";

import { JsonComparisonTool } from "@/components/json-comparison-tool";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            JSON Comparison Tool
          </h1>
          <p className="text-xl text-gray-300">
            Compare JSON structures and find differences easily
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <JsonComparisonTool />
        </div>
      </div>
    </main>
  );
}