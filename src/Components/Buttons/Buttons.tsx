import React from "react";

interface ButtonProps {
  action: (descrption?: string) => void;
  children: React.ReactNode;
}
export default function Button({action, children}: ButtonProps) {
  return (
    <button
      onClick={() => {
        action();
      }}
      className="text-white text-md text-nowrap p-button bg-input rounded-input w-max "
    >
      {children}
    </button>
  );
}
