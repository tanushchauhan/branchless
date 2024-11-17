"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
//import { f } from "../utils"; // Assuming this is correctly imported
//import { g } from "../utils"; // Assuming this is correctly imported

export default function PaymentPage() {
  const [currentBalance, setCurrentBalance] = useState(1000); // Example balance
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isPaymentBooked, setIsPaymentBooked] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const bookPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (amount > currentBalance) {
      setError("Insufficient balance.");
      return;
    }

    setError("");
    setCurrentBalance((prev) => prev - amount); // Deduct from balance
    setIsPaymentBooked(true);
    //f(); // Call the imported function
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Payment Page</h1>
      {!isPaymentBooked ? (
        <>
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
