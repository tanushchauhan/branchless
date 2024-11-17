"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";


export default function QRCodePage() {
  const [acctNumber, setAcctNumber] = useState(""); // Replace with dynamic logic if needed
  const router = useRouter();

  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => data.error ? router.push("/") : setAcctNumber(data.account_number));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {acctNumber ?
        <>
          <h1 className="text-2xl font-bold mb-4">QR Code</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <QRCode 
              value={`http://11.23.7.14:3000/pay?num=${acctNumber}`} 
              size={200} 
              fgColor="#000000" // Foreground color (QR code squares)
              bgColor="#FFFFFF" // Background color
            />
          </div>
          <p className="mt-4">Scan the QR code to view my profile.</p>
        </>
        : <div className="text-center text-3xl font-bold">Loading QR Code...</div>
      }
    </div>
  );
}
