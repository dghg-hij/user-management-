import { cn } from "@/lib/utils"

interface SelectProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  className,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "w-full appearance-none rounded-lg border border-white/10 bg-[#1A1D2E] px-4 py-2 text-sm text-white",
        "outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50",
        className
      )}
    >
      {placeholder && (
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#1A1D2E]">
          {opt.label}
        </option>
      ))}
    </select>
  )
}
