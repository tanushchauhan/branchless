"use client";

import { useRef, useState } from "react";

export default function Page() {
  const [file, setFile] = useState();
  const ref = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/cheque", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      if (ref.current) {
        ref.current.value = "";
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <form onSubmit={submit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          ref={ref}
        />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
