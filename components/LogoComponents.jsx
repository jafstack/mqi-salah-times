/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Logo from "../images/logo.png";
import Image from "next/image";

export default function LogoComponents() {
  return <Image alt="MQI LOGO" src={Logo} width={100} height={50} />;
}
