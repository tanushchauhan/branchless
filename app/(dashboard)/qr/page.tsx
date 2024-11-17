export const metadata = {
  title: appendWebsiteName("QR"),
  description: "Share your QR code or scan others",
};

import { appendWebsiteName } from "@/utils/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function QR() {
  return (
    <>
      <Card className="dark max-w-[80%] mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Share/Scan QR</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            Cool
          </div>
        </CardContent>
      </Card>
    </>
  );
}
