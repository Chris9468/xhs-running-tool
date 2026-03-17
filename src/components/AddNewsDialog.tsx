import { useState } from "react"
import { Plus, Link2, Image, FileText, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { NewsItem } from "@/types"

interface AddNewsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (item: Omit<NewsItem, "id" | "date" | "views" | "likes">) => void
}

const categories = [
  { id: "marathon", label: "马拉松", variant: "marathon" as const },
  { id: "training", label: "训练", variant: "training" as const },
  { id: "gear", label: "装备", variant: "gear" as const },
  { id: "jogging", label: "慢跑", variant: "jogging" as const },
]

export function AddNewsDialog({ open, onOpenChange, onAdd }: AddNewsDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState<"marathon" | "training" | "gear" | "jogging">("marathon")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return

    onAdd({
      title,
      description: description || title,
      url,
      image: image || "/images/running-gear.png",
      category,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setUrl("")
    setImage("")
    setCategory("marathon")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-xhs-red" />
            添加资讯
          </DialogTitle>
          <DialogDescription>
            添加新的小红书跑步资讯到收藏夹
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              标题
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入资讯标题"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              描述
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="输入简短描述（可选）"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              链接
            </label>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xiaohongshu.com/..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Image className="h-4 w-4 text-muted-foreground" />
              图片链接
            </label>
            <Input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://...（可选，留空使用默认图片）"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              分类
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={cat.variant}
                  className={`cursor-pointer transition-all ${
                    category === cat.id
                      ? "ring-2 ring-offset-1 ring-xhs-red"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setCategory(cat.id as typeof category)}
                >
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" className="flex-1">
              添加
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
