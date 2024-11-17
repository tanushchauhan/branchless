"use client";

import { useToast } from "@/hooks/use-toast";
import { WalletCards } from "lucide-react";
import React, { useState, useRef } from "react";

export default function DepositPage() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/cheque", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      if (ref.current) {
        ref.current.files = null;
        ref.current.value = "";
      }
    } catch (e) {
      console.log(e);
      toast({
        description: "Server is possibly down",
        title: "Error",
        className: "bg-red-600 text-white",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Deposit Check</h1>
      <WalletCards width="200px" height="200px" />
      <p className="mt-4 text-lg">Deposit the check at your bank.</p>
      <form onSubmit={submit}>
        <div className="border-2 border-white rounded mt-4">
          <input
            type="file"
            name="file"
            className="p-2 text-white rounded w-64"
            onChange={(e) => setFile(e.target.files?.[0])}
            ref={ref}
          />
        </div>
        <div className="flex flex-row justify-center">
          <button
            type="submit"
            className="mt-4 bg-indigo-500 text-white py-2 px-3 rounded"
          >
            Upload
            <span className="float-right">
              {isSubmitting && (
                <svg
                  className="animate-spin ml-3 h-5 w-5 text-white float-right"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
