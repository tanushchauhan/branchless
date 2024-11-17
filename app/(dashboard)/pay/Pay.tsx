"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pay() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [userId, setUserId] = useState(""); // New state for User ID
  const [isPaymentBooked, setIsPaymentBooked] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState<number | null>(null); // State for fetched balance
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { toast } = useToast();

  // Populate userId from either the named query parameter or the raw query string
  useEffect(() => {
    const queryUserId = params.get("num");
    if (queryUserId) {
      setUserId(queryUserId);
    }
  }, [params, pathname]);

  // Fetch the balance on mount
  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => data.error && router.push("/"));

    async function fetchBalance() {
      try {
        const res = await fetch("/api/info");
        const data = await res.json();
        setBalance(data.amount); // Set the fetched balance
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }

    fetchBalance();
  }, []);

  async function bookPayment() {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (!userId.trim()) {
      setError("User ID is required.");
      return;
    }

    const res = await fetch("/api/info");

    const data = await res.json();

    if (amount > data.amount) {
      setError("Insufficient balance.");
      return;
    }

    setError("");
    setIsPaymentBooked(true);
  }

  const onSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const data = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(paymentAmount),
        receiver: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        return { error: "Something went wrong." };
      });
    if (data.error) {
      setIsSubmitting(false);
      setError(data.error);
      setIsPaymentBooked(false);
    } else {
      toast({
        title: "Success",
        description: "Payment successful!",
        className: "bg-green-600 text-white",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {balance !== null && (
        <div className="flex flex-row gap-x-2 mb-2 items-center">
          <div className="text-lg">Current Balance: ${balance?.toFixed(2)}</div>
          {isPaymentBooked && (
            <div className="text-red-500 text-lg"> -${paymentAmount}</div>
          )}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Payment Page</h1>
      {!isPaymentBooked ? (
        <>
          <div className="mb-4">
            <label htmlFor="user-id" className="block text-lg mb-2">
              Enter Account Number:
            </label>
            <input
              id="user-id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="p-2 text-black rounded w-64"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="payment" className="block text-lg mb-2">
              Enter Payment Amount:
            </label>
            <input
              id="payment"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="p-2 text-black rounded w-64"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={bookPayment}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Book Payment
          </button>
        </>
      ) : (
        <>
          <p className="text-lg mb-4">Payment saved!</p>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
          >
            <span>Submit Payment</span>
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
          </button>
        </>
      )}
    </div>
  );
}
