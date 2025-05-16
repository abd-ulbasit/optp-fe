'use client';
import axios from 'axios';
import { useState } from 'react';

// Helper function to parse and format policy string
const formatPolicyString = (policyStr: string) => {
  try {
    // First, parse the JSON string if it's a JSON string
    let policy = policyStr;

    // If the policy is wrapped in quotes, remove them and unescape
    if (typeof policy === 'string' && policy.startsWith('"') && policy.endsWith('"')) {
      policy = JSON.parse(policy);
    }

    // Return the formatted policy with proper indentation
    return policy;
  } catch (error) {
    console.error("Error formatting policy:", error);
    return policyStr; // Return original if parsing fails
  }
};

export default function Playground() {
  const [kyvernoPolicy, setKyvernoPolicy] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const NEXT_PUBLIC_EXPRESS_BE_URL = process.env.NEXT_PUBLIC_EXPRESS_BE_URL;
    setIsLoading(true);
    try {
      const response = await axios.post(
        NEXT_PUBLIC_EXPRESS_BE_URL + '/translate',
        { kyvernoPolicy: kyvernoPolicy },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setResult(response.data);
    } catch (error) {
      setResult({
        error: `Error: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render the policy with proper formatting
  const renderFormattedPolicy = () => {
    if (!result || !result.policy) return null;

    const formattedPolicy = formatPolicyString(result.policy);

    return (
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre text-sm">
        {formattedPolicy}
      </pre>
    );
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
          className="w-full h-64 p-2 border border-gray-300 rounded-md font-mono text-sm"
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

          {/* Display validation details */}
          {result.details && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium">Validation Status: {result.message}</h3>
              <div className="mt-2">
                {result.details?.validationChecks?.map((check: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${check.passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{check.name} check: {check.passed ? 'Passed' : 'Failed'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render the formatted policy */}
          <h3 className="font-medium mb-2">Policy:</h3>
          {renderFormattedPolicy()}

          <div>
            <h2 className='text-lg font-semibold my-2'>
              Rego Policy Explanation:
            </h2>
            <p className="mt-2">
              {result?.metadata?.rego_policy_explanation}
            </p>
          </div>
          <div>
            <h2 className='text-lg font-semibold my-2'>
              Conversion Explanation:
            </h2>
            <p className="mt-2">
              {result?.metadata?.conversion_explanation}
            </p>
          </div>
          {/* Display raw JSON result for debugging */}
          <div className="mt-4">
            <details>
              <summary className="cursor-pointer text-blue-600">View Raw Response</summary>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto mt-2 text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}