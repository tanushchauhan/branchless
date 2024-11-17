"use client";

import { Suspense } from "react";
import Pay from "./Pay";

export default function Page() {
  return (
    <Suspense>
      <Pay />
    </Suspense>
  );
}
