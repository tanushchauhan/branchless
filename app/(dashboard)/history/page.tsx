export const metadata = {
  title: appendWebsiteName("My History"),
  description: "View your transaction history",
};

import { appendWebsiteName } from "@/utils/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function History() {
  return (
    <>
      <Card className="dark max-w-[80%] mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            Payment stuff
          </div>
        </CardContent>
      </Card>
    </>
  );
}
