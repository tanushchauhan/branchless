import { WalletCards } from "lucide-react";

export default function DepositPage() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Deposit Check</h1>
      <WalletCards width="200px" height="200px" />
      <p className="mt-4 text-lg">Deposit the check at your bank.</p>
      <div className="border-2 border-white rounded mt-4">
        <input type="file" className="p-2 text-white rounded w-64" />
      </div>
      <button className="mt-4 bg-indigo-500 text-white p-2 rounded">Upload</button>
    </div>
  );
}