"use client";

import { useEffect } from "react";

async function runthis() {
  const res = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({
      email: "tanushchauhan07@gmail.com",
      password: "qwertyuiop",
    }),
  });

  const res2 = await fetch("/api/transactions");

  const data = await res2.json();
  console.log(data);
}

function Page() {
  useEffect(() => {
    runthis();
  }, []);
  return <div>Test Page</div>;
}

export default Page;
