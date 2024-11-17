export const metadata = {
  title: appendWebsiteName("Dashboard"),
  description: "Dashboard for Branchless bank controls",
};

import { appendWebsiteName } from "@/utils/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Dashboard() {
  const cards = [
    {
      name: "Make payment",
      url: "/pay"
    },
    {
      name: "Transaction History",
      url: "/history"
    },
    {
      name: "QR Code",
      url: "/qr"
    }
  ];

  return (
    <>
      <Card className="dark max-w-[80%] mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap justify-center gap-8">
          {cards.map((card, i) => (
            <a href={card.url}>
              <Card key={i} className="transition-colors duration-200 hover:bg-indigo-950 active:bg-indigo-900 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{card.name}</div>
                </CardContent>
              </Card>
            </a>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
