"use client";
import React from "react";
import ClockComponents from "./Clock";
import { Table } from "./Table";
import LogoComponents from "./LogoComponents";

export function TimesSection({ times }) {
  return (
    <div className=" flex flex-col justify-start items-center w-full md:w-1/5">
      <LogoComponents />
      <ClockComponents />
      <Table times={times} />
    </div>
  );
}
