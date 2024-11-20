'use client';

import { useState, useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { JsonInput } from '@/components/json-input';
import { ComparisonResults } from '@/components/comparison-results';
import { useJsonComparison } from '@/hooks/use-json-comparison';

export function JsonComparisonTool() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [compareValues, setCompareValues] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'key' | 'diff'>('key');
  const [fileNames, setFileNames] = useState({ json1: 'JSON 1', json2: 'JSON 2' });

  const { keyComparison, diffComparison } = useJsonComparison(json1, json2, compareValues);

  const handleFileDrop = useCallback((file: File, target: 'json1' | 'json2') => {
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (target === 'json1') {
          setJson1(e.target?.result as string);
        } else {
          setJson2(e.target?.result as string);
        }
        setFileNames((prev) => ({ ...prev, [target]: file.name }));
      };
      reader.readAsText(file);
    }
  }, []);

  const clearInput = useCallback((target: 'json1' | 'json2') => {
    if (target === 'json1') {
      setJson1('');
    } else {
      setJson2('');
    }
    setFileNames((prev) => ({ ...prev, [target]: `JSON ${target === 'json1' ? '1' : '2'}` }));
  }, []);

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <JsonInput
          id='json1'
          value={json1}
          onChange={setJson1}
          onDrop={(file) => handleFileDrop(file, 'json1')}
          onClear={() => clearInput('json1')}
          label={fileNames.json1}
        />
        <JsonInput
          id='json2'
          value={json2}
          onChange={setJson2}
          onDrop={(file) => handleFileDrop(file, 'json2')}
          onClear={() => clearInput('json2')}
          label={fileNames.json2}
        />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <div className='flex gap-4'>
          <Button
            variant={comparisonMode === 'key' ? 'default' : 'outline'}
            onClick={() => setComparisonMode('key')}
          >
            Key Comparison
          </Button>
          <Button
            variant={comparisonMode === 'diff' ? 'default' : 'outline'}
            onClick={() => setComparisonMode('diff')}
          >
            f Diff Comparison
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox
            id='compareValues'
            checked={compareValues}
            onCheckedChange={(checked) => setCompareValues(checked as boolean)}
          />
          <Label htmlFor='compareValues' className='text-white'>
            Compare Values
          </Label>
        </div>
      </div>

      <ComparisonResults
        mode={comparisonMode}
        keyComparison={keyComparison}
        diffComparison={diffComparison}
      />
    </div>
  );
}
