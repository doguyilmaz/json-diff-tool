"use client";

import { cn } from "@/lib/utils";

interface ComparisonResultsProps {
  mode: "key" | "diff";
  keyComparison: {
    missingInJson1: string;
    missingInJson2: string;
  };
  diffComparison: string;
}

export function ComparisonResults({
  mode,
  keyComparison,
  diffComparison,
}: ComparisonResultsProps) {
  return (
    <div className="space-y-8">
      <div className={cn(mode === "key" ? "block" : "hidden")}>
        <h2 className="text-xl font-bold text-center text-gray-300 mb-4">
          Key Differences
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-200">
              Missing in JSON 1 but exists in JSON 2:
            </h3>
            <pre className="mt-2 bg-gray-700 p-4 rounded-lg text-sm text-gray-300 overflow-auto border border-gray-600">
              {keyComparison.missingInJson1}
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200">
              Missing in JSON 2 but exists in JSON 1:
            </h3>
            <pre className="mt-2 bg-gray-700 p-4 rounded-lg text-sm text-gray-300 overflow-auto border border-gray-600">
              {keyComparison.missingInJson2}
            </pre>
          </div>
        </div>
      </div>

      <div className={cn(mode === "diff" ? "block" : "hidden")}>
        <h2 className="text-xl font-bold text-center text-gray-300 mb-4">
          Detailed Diff
        </h2>
        <div
          className="mt-4 bg-gray-700 p-4 rounded-lg text-sm overflow-auto border border-gray-600"
          dangerouslySetInnerHTML={{ __html: diffComparison }}
        />
      </div>
    </div>
  );
}