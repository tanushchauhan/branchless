"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [currentBalance, setCurrentBalance] = useState(1000); // Example balance
  const [paymentAmount, setPaymentAmount] = useState("");
  const [userId, setUserId] = useState(""); // New state for User ID
  const [isPaymentBooked, setIsPaymentBooked] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState<number | null>(null); // State for fetched balance
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Populate userId from either the named query parameter or the raw query string
  useEffect(() => {
    const queryUserId = params.get("num");
    if (queryUserId) {
      setUserId(queryUserId);
    }
  }, [params, pathname]);

  // Fetch the balance on mount
  useEffect(() => {
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
    setCurrentBalance((prev) => prev - amount); // Deduct from balance
    setIsPaymentBooked(true);
  }

  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => data.error && router.push("/"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {balance !== null && (
        <p className="text-lg mb-2">Current Balance: ${balance?.toFixed(2)}</p>
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
          <p className="text-lg mb-4">Payment booked successfully!</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded"
          >
            Submit Payment
          </button>
        </>
      )}
    </div>
  );
}
