import React from "react";

export default function Hero() {
  return (
    <div className="relative bg-tertiary">
      <div className=" pl-36 grid xl:grid-cols-2 ">
        {/* left-side */}
        <div className="mt-34.5 z-10">
          <span className="uppercase text-secondary text-[14px] font-semibold">
            {" "}
            est. 1994 - paris
          </span>

          <h1 className="text-[80px]">L'Essence Gastronomy</h1>
          <p className="font-regular text-[18px] w-[450px]">
            Where heritage meets contemporary culinary artistry. Experience a
            journey of intentional flavors served in an atmosphere of hushed,
            intimate luxury.
          </p>

          {/* cta-buttons */}
          <div className="mt-[48px]">
            <button className="primary-btn text-white btn-hover">
              Book a table
            </button>
          </div>
        </div>

        {/* right side image */}
        <div>
          <img src="/hero.png" alt="" className="w-full" />
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
