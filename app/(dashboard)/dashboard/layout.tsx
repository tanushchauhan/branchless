import { appendWebsiteName } from "@/utils/config";

export const metadata = {
  title: appendWebsiteName("Dashboard"),
  description: "Dashboard for Branchless bank controls",
};

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default DashboardLayout;