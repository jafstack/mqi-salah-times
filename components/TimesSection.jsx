"use client";
import React from "react";
import ClockComponents from "./Clock";
import { Table } from "./Table";
import LogoComponents from "./LogoComponents";

export function TimesSection({ times }) {
  return (
    <>
      <LogoComponents />
      <ClockComponents />
      <Table times={times} />
    </>
  );
}
