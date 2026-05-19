

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'black' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "relative font-black uppercase tracking-tighter border-4 border-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none duration-100 cursor-pointer";

  const variants = {
    primary: "bg-primary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-secondary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    black: "bg-black text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] hover:shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]",
    outline: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-xl",
    full: "w-full py-3 text-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
