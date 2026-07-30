import React from "react";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import About from "../component/About";
import Booking from "../component/Booking";
import Footer from "../component/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* main section*/}
      <div>
        {/* hero section */}
        <Hero />
        {/* about section */}
        <About />

        {/* booking section */}
        <Booking />
      </div>
      <Footer />
    </div>
  );
}
