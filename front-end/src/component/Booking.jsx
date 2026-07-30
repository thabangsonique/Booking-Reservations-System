import React from "react";
import { Link } from "react-router-dom";

export default function Booking() {
  return (
    <div className="bg-white py-[128px] px-[256px] ">
      <div className="flex flex-col items-center justify-center space-y-8 border border-gray-500 py-[80px]">
        <h1 className="text-[48px]">Secure Your Experience</h1>
        <p>
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
