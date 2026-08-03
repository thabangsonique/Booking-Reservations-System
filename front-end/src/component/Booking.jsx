import React from "react";
import { Link } from "react-router-dom";

export default function Booking() {
  return (
    <div className="bg-white py-[128px] md:px-[256px] ">
      <div className="flex flex-col items-center  justify-center space-y-8 md:border md:border-gray-500 py-[80px] ">
        <h1 className="xl:text-[48px] md:text-2xl text-2xl text-center">
          Secure Your Experience
        </h1>
        <p className="md:text-center hidden md:block">
          Due to the intimate nature of our dining room, we recommend booking
          several weeks in advance.
        </p>
        <Link to="/reservation">
          <button className="primary-btn text-white btn-hover">
            Check Availablity
          </button>
        </Link>
      </div>
    </div>
  );
}
