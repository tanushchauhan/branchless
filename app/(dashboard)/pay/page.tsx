export const metadata = {
  title: appendWebsiteName("Pay"),
  description: "Pay others with ease",
};

import { appendWebsiteName } from "@/utils/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Pay() {
  return (
    <>
      <Card className="dark max-w-[80%] mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Pay</CardTitle>
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
