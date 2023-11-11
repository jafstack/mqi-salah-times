"use client";
import React, { useState, useEffect } from "react";
import HijriDate from "./HijriDateComponent";

export default function ClockComponents() {
  const [time, setTime] = useState({
    year: "",
    month: "",
    day: "",
    hrs: 0,
    mins: 0,
    sec: 0,
  });

  useEffect(() => {
    setInterval(currentTime, 1000);
  }, []);

  const currentTime = () => {
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let sec = date.getSeconds();
    hrs = addZero(hrs);
    mins = addZero(mins);
    sec = addZero(sec);

    setTime({ year, month, day, hrs, mins, sec });
  };
  return (
    <div className="">
      <h2>
        {time.hrs}:{time.mins}
      </h2>
      <h2>
        {time.day} {time.month} {time.year}
      </h2>
      <HijriDate />
    </div>
  );
}
