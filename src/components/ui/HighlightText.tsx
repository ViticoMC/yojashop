

interface HighlightTextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'sale';
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    error: 'text-error',
    sale: 'text-sale',
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
