import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mb-2 mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
