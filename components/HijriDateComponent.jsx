"use client";
import React from "react";
// import moment from "moment-hijri";

const islamiMonths = [
  "مُحَرَّم",
  "صَفَر",
  "رَبِيع ٱلْأَوَّل",
  "ربيع الثاني",
  "جُمَادَىٰ ٱلْأُولَىٰ",
  "جُمَادَىٰ ٱلْآخِرَة",
  "رَجَب",
  "شَعْبَان",
  "رَمَضَان",
  "شَوَّال",
  "ذُو ٱلْقَعْدَة",
  "ذُو ٱلْحِجَّة",
];

const HijriDate = () => {
  // const hijriDate = moment();
  return (
    <h2 className="text-xl">
      {/* {`هـ${hijriDate.iYear()}`} {islamiMonths[hijriDate.iMonth()]}{" "}
      {hijriDate.iDate()}{" "} */}
    </h2>
  );
};

export default HijriDate;
