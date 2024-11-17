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

  const data1 = await res.json();
  console.log(data1);

  const res2 = await fetch("/api/transactions", {
    method: "POST",
    body: JSON.stringify({
      receiver: "12c205ad-a13b-472c-9a81-5bed88500061",
      amount: 100,
    }),
  });

  const data = await res2.json();
  console.log(data);

  const res3 = await fetch("/api/info");
  const data3 = await res3.json();
  console.log(data3);
}

function Page() {
  useEffect(() => {
    runthis();
  }, []);
  return <div>Test Page</div>;
}

export default Page;
