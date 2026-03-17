import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  showFavoritesOnly: boolean
  onToggleFavorites: () => void
}

const categories = [
  { id: "all", label: "全部" },
  { id: "marathon", label: "马拉松", color: "text-running-green" },
  { id: "training", label: "训练", color: "text-running-blue" },
  { id: "gear", label: "装备", color: "text-running-orange" },
  { id: "jogging", label: "慢跑", color: "text-running-purple" },
]

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showFavoritesOnly,
  onToggleFavorites,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索跑步资讯..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 transition-all duration-200",
                  selectedCategory === cat.id
                    ? "bg-xhs-gradient text-white shadow-lg shadow-xhs-red/25"
                    : "hover:border-xhs-red/30"
                )}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Favorites Toggle */}
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorites}
            className={cn(
              "whitespace-nowrap rounded-full",
              showFavoritesOnly && "bg-xhs-gradient text-white"
            )}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1.5" />
            收藏
          </Button>
        </div>
      </div>
    </div>
  )
}
