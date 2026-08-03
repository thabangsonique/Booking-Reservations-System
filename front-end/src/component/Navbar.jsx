import { Menu } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center xl:px-26 px-5 py-5 justify-between w-full border-b-2 border-gray-500/30 z-50">
      {/* left-side */}
      <NavLink to={"/"} className="hover:cursor-pointer">
        <h1 className=" text-3xl md:text-[48px]  font-regular">L'Essence</h1>
      </NavLink>

      {/* middle */}
      <div className="hidden md:block space-x-5">
        <NavLink className="font-semibold  text-[14px]">Our Menu</NavLink>
        <NavLink to={"/reservation"} className="font-semibold  text-[14px]">
          Reservations
        </NavLink>
      </div>

      {/* right-side */}
      <NavLink to={"/reservation"} className="hidden md:block">
        {" "}
        <button className="btn-hover primary-btn text-white font-semibold">
          Book Now
        </button>
      </NavLink>

      {/* menu-icon */}
      <div className="block md:hidden">
        {" "}
        <Menu />
      </div>
    </div>
  );
}
