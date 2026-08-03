import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center px-26  justify-between  w-full border-b-2 border-gray-500/30 z-50">
      {/* left-side */}
      <h1 className="text-[48px] font-regular">L'Essence</h1>

      {/* middle */}
      <div className="space-x-5">
        <NavLink className="font-semibold  text-[14px]">Our Menu</NavLink>
        <NavLink className="font-semibold  text-[14px]">Reservations</NavLink>
      </div>

      {/* right-side */}
      <button className="btn-hover primary-btn text-white font-semibold">
        Book Now
      </button>
    </div>
  );
}
