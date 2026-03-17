import { Search, Bookmark, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  type: "search" | "favorites" | "default"
  onAdd?: () => void
  onClear?: () => void
}

export function EmptyState({ type, onAdd, onClear }: EmptyStateProps) {
  const configs = {
    search: {
      icon: Search,
      title: "没有找到相关资讯",
      description: "试试其他关键词，或者添加新的资讯",
      action: onClear,
      actionLabel: "清除搜索",
    },
    favorites: {
      icon: Bookmark,
      title: "还没有收藏",
      description: "点击资讯卡片上的收藏按钮，把喜欢的内容保存到这里",
      action: onAdd,
      actionLabel: "去浏览",
    },
    default: {
      icon: Plus,
      title: "还没有资讯",
      description: "添加第一条跑步资讯，开始你的收藏之旅",
      action: onAdd,
      actionLabel: "添加资讯",
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-xhs-light flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-xhs-red/60" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {config.description}
      </p>
      {config.action && (
        <Button onClick={config.action} variant="outline" className="rounded-full">
          {type === "default" && <Plus className="h-4 w-4 mr-2" />}
          {config.actionLabel}
        </Button>
      )}
    </div>
  )
}
