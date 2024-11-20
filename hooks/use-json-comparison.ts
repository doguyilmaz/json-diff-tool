'use client';

import { useMemo } from 'react';
import { diff } from 'json-diff';

interface ComparisonResult {
  missingInJson1: string[];
  missingInJson2: string[];
}

export function useJsonComparison(json1: string, json2: string, compareValues: boolean) {
  return useMemo(() => {
    let obj1: any;
    let obj2: any;

    try {
      obj1 = json1 ? JSON.parse(json1) : {};
      obj2 = json2 ? JSON.parse(json2) : {};
    } catch (e) {
      return {
        keyComparison: { missingInJson1: [], missingInJson2: [] },
        diffComparison: null,
      };
    }

    // Key comparison (always just compares structure)
    const keys1 = new Set(getAllKeys(obj1));
    const keys2 = new Set(getAllKeys(obj2));

    const keyComparison: ComparisonResult = {
      missingInJson1: Array.from(keys2).filter((key) => !keys1.has(key)),
      missingInJson2: Array.from(keys1).filter((key) => !keys2.has(key)),
    };

    // Diff comparison
    const diffOptions = {
      keysOnly: !compareValues, // Only compare keys when compareValues is false
      full: true,
    };

    let diffComparison = null;
    try {
      diffComparison = diff(obj1, obj2, diffOptions);
    } catch (e) {
      console.error('Diff comparison failed:', e);
    }

    return {
      keyComparison,
      diffComparison,
    };
  }, [json1, json2, compareValues]);
}

// Helper function to get all keys recursively
function getAllKeys(obj: any): string[] {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }

  const keys = new Set<string>();

  function collect(current: any, prefix = '') {
    if (typeof current !== 'object' || current === null) {
      return;
    }

    for (const key of Object.keys(current)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.add(fullKey);
      collect(current[key], fullKey);
    }
  }

  collect(obj);
  return Array.from(keys);
}
