import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = "搜索...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-white/10 bg-[#1A1D2E] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500",
          "outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
        )}
      />
    </div>
  )
}
