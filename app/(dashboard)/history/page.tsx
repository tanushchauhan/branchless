export const metadata = {
  title: appendWebsiteName("My History"),
  description: "View your transaction history",
};

import { appendWebsiteName } from "@/utils/config";
import History from "./History";

export default function HistoryPage() {
  return (
    <History />
  );
}
