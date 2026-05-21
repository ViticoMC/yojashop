import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block font-black uppercase tracking-tight mb-1 text-sm md:text-base">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white border-4 border-black p-3 
            font-bold placeholder:text-gray-400 focus:outline-none 
            focus:ring-2 focus:ring-primary/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            transition-all relative
            ${icon ? 'pl-12' : 'pl-4'}
            ${error ? 'border-error' : 'border-black'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-error font-black text-xs uppercase italic drop-shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
          ⚠ {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

