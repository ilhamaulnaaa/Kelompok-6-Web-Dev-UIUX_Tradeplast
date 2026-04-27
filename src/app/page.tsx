import React from "react";
import Hero from "./components/sections/Hero";
import { WhyChooseUs } from "./components/sections/WhyChooseUs";
import { JoinUsers } from "./components/sections/JoinUsers";
import { Distribution } from "./components/sections/Distribution";
import { Footer } from "./components/sections/Footer";
import { Advantage } from "./components/sections/Advantage";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <Advantage />
      <JoinUsers />
      <Distribution />
      <Footer />
    </main>
  );
}
