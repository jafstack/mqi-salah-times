"use client";
import { TimesSection } from "@/components/TimesSection";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [salahTimes, setTimes] = useState();
  useEffect(() => {
    const getTimes = async () => {
      const resp = await axios.get("https://minhaj.se/app-api/get-times.php");
      if (resp.status === 200) {
        setTimes(resp.data);
      }
    };
    getTimes();
  }, []);
  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen items-start justify-between p-10">
      {salahTimes ? <TimesSection times={salahTimes} /> : "...Loading"}
    </main>
  );
}
