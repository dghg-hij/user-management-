import { cn } from "@/lib/utils"

const variantStyles = {
  primary:
    "bg-amber-500 text-gray-900 hover:bg-amber-400 disabled:bg-amber-500/50",
  secondary:
    "border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 disabled:opacity-50",
  danger:
    "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-600/50",
  ghost:
    "text-gray-300 hover:bg-white/5 disabled:opacity-50",
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  children: React.ReactNode
  className?: string
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
