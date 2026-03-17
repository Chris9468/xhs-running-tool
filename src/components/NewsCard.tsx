import { Heart, Bookmark, ExternalLink, Eye } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, formatNumber } from "@/lib/utils"
import type { NewsItem } from "@/types"

interface NewsCardProps {
  item: NewsItem
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onOpenLink: (url: string) => void
}

const categoryVariants: Record<string, "default" | "marathon" | "training" | "gear" | "jogging"> = {
  marathon: "marathon",
  training: "training",
  gear: "gear",
  jogging: "jogging",
  default: "default",
}

const categoryLabels: Record<string, string> = {
  marathon: "马拉松",
  training: "训练",
  gear: "装备",
  jogging: "慢跑",
  default: "其他",
}

export function NewsCard({ item, isFavorite, onToggleFavorite, onOpenLink }: NewsCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge
          variant={categoryVariants[item.category] || "default"}
          className="absolute left-3 top-3 shadow-lg"
        >
          {categoryLabels[item.category] || categoryLabels.default}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base group-hover:text-xhs-red transition-colors cursor-pointer">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {formatNumber(item.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {formatNumber(item.likes)}
            </span>
            <span>{formatDate(item.date)}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onToggleFavorite(item.id)}
              className={isFavorite ? "text-xhs-red" : "text-muted-foreground"}
            >
              <Bookmark className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenLink(item.url)}
              className="text-muted-foreground hover:text-xhs-red"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
