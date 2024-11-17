"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { CircleDollarSign, PcCase, QrCodeIcon, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

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
    }
  ];

  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => data.error && router.push("/"));
  }, []);

  return (
    <>
      <Card className="dark max-w-[80%] mx-auto mt-8 px-8 py-6">
        <CardHeader className="flex flex-row items-center gap-x-3">
          <PcCase className="m-0" width="40" height="40" />
          <CardTitle className="text-2xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap justify-center gap-8">
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
      </Card>
    </>
  );
}
