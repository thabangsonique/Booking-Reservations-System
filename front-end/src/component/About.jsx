import React from "react";

export default function About() {
  return (
    <div className="px-24 py-24 bg-tertiary-2">
      {/* TOP-SECTION */}
      <div className="flex gap-10">
        {/* left text */}
        <div className="flex flex-col justify-center w-[336px] space-y-[24px]">
          <h3 className="text-[39px]">Our Philosophy</h3>
          <p>
            Every ingredient is chosen with a master's precision, sourced from
            heritage farms that share our devotion to the earth's natural
            rhythm.
          </p>
        </div>
        {/* right-image */}
        <div className="relative hidden md:block h-80 w-300">
          <img
            src="/dining.png"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-[40px] left-[32px] text-white ">
            <h3 className="text-2xl font-regular">The Dining Room</h3>
            <p className="text-lg">
              An architectural ode to quiet luxury and refined intimacy.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM-SECTION */}
      <div className="mt-8 flex justify-between">
        {/* left */}
        <div className="rounded-xl bg-card py-10 px-10 ">
          <img src="/icon-new.svg" alt="dining icon" />
          {/* text */}
          <h2 className="text-[24px] mt-[24px]">Tasting Menus</h2>
          <p className="mt-[12px]">
            Twelve courses of seasonal storytelling, curated daily by Chef
            Julian Vasseur.
          </p>
        </div>
        {/* right */}
        <div className="hidden md:block">
          <img
            src="/wine.png"
            alt="wine storage"
            className="rounded-2xl w-[520px]"
          />
        </div>
      </div>
    </div>
  );
}
