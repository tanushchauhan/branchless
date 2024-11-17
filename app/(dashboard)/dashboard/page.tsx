"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { CircleDollarSign, PcCase, QrCodeIcon, Receipt, WalletCardsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  const cards = [
    {
      name: "Make payment",
      url: "/pay",
      icon: <CircleDollarSign width="100px" height="100px" />
    },
    {
      name: "Transaction History",
      url: "/history",
      icon: <Receipt width="100px" height="100px" />
    },
    {
      name: "QR Code",
      url: "/qr",
      icon: <QrCodeIcon width="100px" height="100px" />
    },
    {
      name: "Deposit Check",
      url: "/deposit",
      icon: <WalletCardsIcon width="100px" height="100px" />
    }
  ];

  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => data.error ? router.push("/") : setUser(data));
  }, []);
  console.log(user);

  return (
    <>
      <Card className="dark w-[80%] max-w-[1200px] mx-auto mt-8 px-10 py-6">
        <CardHeader className="flex flex-row items-center gap-x-3">
          <PcCase className="m-0" width="40" height="40" />
          <CardTitle className="text-2xl">Dashboard</CardTitle>
        </CardHeader>

        {user === null ? <div className="text-xl mt-4 font-bold text-center">Loading...</div> : <>
          <CardContent className="flex flex-row flex-grow flex-wrap justify-between gap-8">
            <div className="m-auto *:text-center">
              <div className="text-2xl font-semibold">Welcome, {user.name}</div>
              <div className="text-md">Member since {new Date(user.created_at).toLocaleDateString()}</div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Balance</CardTitle>
                <CardContent className="text-md">
                  ${user.amount.toFixed(2)}
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Account #</CardTitle>
                <CardContent className="text-md">
                  {user.account_number}
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Phone #</CardTitle>
                <CardContent className="text-md">
                  {user.phone_number}
                </CardContent>
              </CardHeader>
            </Card>
          </CardContent>
          <br/>
          <CardContent className="flex flex-row flex-grow flex-wrap justify-between gap-8">
            {cards.map((card, i) => (
              <Link key={i} href={card.url}>
                <Card className="transition-colors duration-200 hover:bg-indigo-950 active:bg-indigo-900 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{card.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row justify-center">{card.icon}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </>}
      </Card>
    </>
  );
}
