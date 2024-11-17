"use client";

import { useEffect } from "react";

async function runthis() {
  const res2 = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      // Your data here
      email: "ellisonzhuaqw@gmail.com",
      password: "123f4rfe443",
      name: "Ellison",
      phone_number: "7975649854",
    }),
  });

  const data = await res2.json();

  console.log(data);

  const res = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({
      // Your data here
      email: "ellisonzhuaqw@gmail.com",
      password: "123f4rfe443",
    }),
  });

  const res3 = await fetch("/api/info");

  const data2 = await res3.json();
  console.log(data2);
}

function Page() {
  useEffect(() => {
    runthis();
  }, []);
  return <div>Test Page</div>;
}

export default Page;
