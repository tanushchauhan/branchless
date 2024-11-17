import React from "react";
import QRCode from "react-qr-code";


export default function QRCodePage() {
  const variableNumber = "1234567890"; // Replace with dynamic logic if needed
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCode 
          value={`http://11.23.7.111:3000/pay?num=${variableNumber}`} 
          size={200} 
          fgColor="#000000" // Foreground color (QR code squares)
          bgColor="#FFFFFF" // Background color
        />
      </div>
      <p className="mt-4">Scan the QR code to view my profile.</p>
    </div>
  );
}
