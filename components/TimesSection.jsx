"use client";
import React from "react";
import ClockComponents from "./Clock";
import { Table } from "./Table";
import LogoComponents from "./LogoComponents";

export function TimesSection({ times }) {
  return (
    <div className="">
      <LogoComponents />
      <ClockComponents />
      <Table times={times} />
    </div>
  );
}
