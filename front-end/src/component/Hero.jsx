import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative bg-tertiary">
      <div className=" xl:pl-36 md:pl-[102px] grid md:grid-cols-2 md:gap-10 ">
        {/* left-side */}
        <div className="text-center md:text-start mt-34.5 z-10">
          <span className="uppercase text-secondary text-[14px] font-semibold">
            {" "}
            est. 1994 - paris
          </span>

          <h1 className="text-4xl md:text-[80px]">
            L'Essence <br />
            Gastronomy
          </h1>
          <p className="mx-auto md:mx-0 font-regular mt-8 md:mt-0 text-sm md:text-[18px] md:w-[450px] w-[200px]">
            Where heritage meets contemporary culinary artistry.
          </p>

          {/* cta-buttons */}
          <div className="mt-[48px]">
            <Link to="/reservation">
              {" "}
              <button className="primary-btn text-white btn-hover">
                Book a table
              </button>
            </Link>
          </div>
        </div>

        {/* right side image */}
        <div className="md:mt-30 xl:mt-0 hidden md:block">
          <img src="/hero.png" alt="" className="xl:w-full md:w-[500px]" />
        </div>
      </div>

      {/* scroll */}
      <div className="flex flex-col items-center mt-10 animate-float">
        <span className="uppercase tracking-wider text-[12px] font-bold">
          scroll
        </span>

        {/* vertical line */}

        <div className="h-[48px] w-[2px] bg-gradient-to-b from-primary to-transparent" />
      </div>
    </div>
  );
}
