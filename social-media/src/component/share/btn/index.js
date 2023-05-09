import React from "react";

function MainBtn({ type, onClick, disabled, className, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` text-white text-[18px]  py-[16px] cursor-pointer bg-blue-500  rounded-[100px]  ${className}`}
    >
      {children}
    </button>
  );
}
export { MainBtn };
function PrimaryBtn({ type, onClick, disabled, className, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` text-blue-500 text-[18px]  py-[16px] cursor-pointer bg-white border border-solid border-blue-500  rounded-[100px]  ${className}`}
    >
      {children}
    </button>
  );
}
export { PrimaryBtn };
