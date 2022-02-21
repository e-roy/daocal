import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className = '', type, disabled, onClick, children }) => {
  const btnBase =
    'rounded-xl bg-gradient-to-r from-fuchsia-700 hover:from-fuchsia-600 to-sky-600 hover:to-sky-400 shadow-md hover:shadow-md shadow-sky-600/20  border-fuchsia-700/20';

  if (disabled)
    return (
      <div className={`${btnBase} ${className} p-[1px]`}>
        <div className="flex px-4 py-2 font-medium bg-stone-700  text-stone-100  m-[2px] rounded-xl">{children}</div>
      </div>
    );

  return (
    <button className={`${btnBase} ${className}`} type={type} onClick={onClick}>
      <div className="flex px-4 py-2 font-medium bg-stone-700 hover:bg-zinc-700 text-stone-100 hover:text-white m-[3px] rounded-lg">
        {children}
      </div>
    </button>
  );
};

export default Button;
