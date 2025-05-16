"use client";
import axios from "axios";
import { useState } from "react";

export default function Feedback() {
    const [kyvernoPolicy, setKyvernoPolicy] = useState("");
    const [regoPolicy, setRegoPolicy] = useState("");
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        const NEXT_PUBLIC_EXPRESS_BE_URL = process.env.NEXT_PUBLIC_EXPRESS_BE_URL;
        setIsLoading(true);
        setResult(null);
        try {
            const response = await axios.post(
                NEXT_PUBLIC_EXPRESS_BE_URL + "/feedback",
                {
                    kyverno_policy: kyvernoPolicy,
                    rego_policy: regoPolicy,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            setResult({ success: true, message: response.data.message });
        } catch (error) {
            const err = error as { response?: { data?: { message?: string, error?: string } }; message?: string };
            setResult({
                success: false,
                message: err?.response?.data?.error || err?.message || "Unknown error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Feedback: Policy Pair Submission</h1>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="kyvernoPolicy" className="block text-sm font-medium mb-2">
                        Kyverno Policy:
                    </label>
                    <textarea
                        id="kyvernoPolicy"
                        className="w-full h-40 p-2 border border-gray-300 rounded-md font-mono text-sm"
                        value={kyvernoPolicy}
                        onChange={(e) => setKyvernoPolicy(e.target.value)}
                        placeholder="Paste your Kyverno policy here..."
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="regoPolicy" className="block text-sm font-medium mb-2">
                        Rego Policy:
                    </label>
                    <textarea
                        id="regoPolicy"
                        className="w-full h-40 p-2 border border-gray-300 rounded-md font-mono text-sm"
                        value={regoPolicy}
                        onChange={(e) => setRegoPolicy(e.target.value)}
                        placeholder="Paste your Rego policy here..."
                    />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
                {isLoading ? "Submitting..." : "Submit Feedback"}
            </button>
            {result && (
                <div className={`mt-6 p-4 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {result.message}
                </div>
            )}
        </div>
    );
}
