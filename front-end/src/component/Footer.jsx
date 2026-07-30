import React from "react";

export default function Footer() {
  return (
    <div className="bg-black px-[104px] flex items-center justify-between">
      {/* left-side */}
      <div className="py-[48px] w-[289px]">
        <h3 className="text-white text-[24px]">L'Essence Gastronomy</h3>
        <p className="text-white/50 mt-[16px] text-[16px] font-regular font-manrope">
          The intersection of tradition and avant- garde culinary expression.
        </p>
      </div>

      {/* right-side */}
      <div>
        <div className="text-white/50 font-manrope space-x-5 ">
          <span className="">Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Press Inquiries</span>
          <span>Careers</span>

          <p className="mt-6">
            © 2024 L'Essence Gastronomy. All rights reserved.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
