import { cn } from "@/lib/utils"

const variantStyles = {
  success: "bg-green-500/20 text-green-400",
  danger: "bg-red-500/20 text-red-400",
  warning: "bg-amber-500/20 text-amber-400",
  info: "bg-blue-500/20 text-blue-400",
  default: "bg-gray-500/20 text-gray-400",
}

interface BadgeProps {
  variant?: keyof typeof variantStyles
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
