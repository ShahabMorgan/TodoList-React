import React, {Children, forwardRef} from "react";
import "./Input.css";

interface InputProps {
  children: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({children}, ref) => {
  return (
    <input
      ref={ref}
      placeholder={`${children}`}
      type="text"
      className="w-full border outline-none placeholder-input text-input p-input border-input rounded-input"
    />
  );
});

export default Input;
