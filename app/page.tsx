"use client";
import { TimesSection } from "@/components/TimesSection";
import axios from "axios";
import Image from "next/image";
import banner from "../images/footer.png";
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
    <main className="flex flex-col gap-9 w-full items-center justify-between min-h-screen pt-10">
      <div className="flex flex-col justify-start items-center max-w-[2000px] flex-grow">
        {salahTimes ? <TimesSection times={salahTimes} /> : "...Loading"}
      </div>
      <div className="hidden lg:flex flex-col items-center justify-end w-full pb-4">
        <Image src={banner} alt="" priority />
      </div>
    </main>
  );
}
