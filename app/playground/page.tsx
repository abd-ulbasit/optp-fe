// app/playground/page.tsx
'use client';

import { useState } from 'react';

export default function Playground() {
  const [kyvernoPolicy, setKyvernoPolicy] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3333"+'/playground/kyverno-to-rego', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kyvernoPolicy }),
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Kyverno Policy Playground</h1>
      
      <div className="mb-4">
        <label 
          htmlFor="kyvernoPolicy" 
          className="block text-sm font-medium mb-2"
        >
          Enter Kyverno Policy:
        </label>
        <textarea
          id="kyvernoPolicy"
          className="w-full h-64 p-2 border border-gray-300 rounded-md"
          value={kyvernoPolicy}
          onChange={(e) => setKyvernoPolicy(e.target.value)}
          placeholder="Paste your Kyverno policy here..."
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? 'Processing...' : 'Translate Policy'}
      </button>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}