"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface JsonInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDrop: (file: File) => void;
  onClear: () => void;
}

export function JsonInput({ id, label, value, onChange, onDrop, onClear }: JsonInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onDrop(files[0]);
    }
  }, [onDrop]);

  return (
    <div>
      <Label htmlFor={id} className="text-lg font-semibold text-white">
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Paste or drop JSON ${id === "json1" ? "1" : "2"} here`}
        className={cn(
          "mt-2 w-full h-48 p-4 border-2 border-dashed rounded-lg",
          "bg-gray-700 text-white placeholder-gray-400",
          "focus:border-blue-500 focus:outline-none transition-colors",
          isDragging && "border-blue-500"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
      <Button
        variant="ghost"
        className="mt-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
        onClick={onClear}
      >
        Clear {label}
      </Button>
    </div>
  );
}