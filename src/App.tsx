import { useState, useMemo, useEffect } from "react"
import { Heart, Plus, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/NewsCard"
import { FilterBar } from "@/components/FilterBar"
import { AddNewsDialog } from "@/components/AddNewsDialog"
import { EmptyState } from "@/components/EmptyState"
import { mockNewsData } from "@/data/mockData"
import type { NewsItem, Category } from "@/types"

function App() {
  const [news, setNews] = useState<NewsItem[]>(mockNewsData)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("running-news-favorites")
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("running-news-favorites", JSON.stringify([...favorites]))
  }, [favorites])

  // Filter news
  const filteredNews = useMemo(() => {
    let result = news

    // Filter by favorites
    if (showFavoritesOnly) {
      result = result.filter((item) => favorites.has(item.id))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [news, favorites, showFavoritesOnly, selectedCategory, searchQuery])

  // Stats
  const stats = useMemo(() => {
    return {
      total: news.length,
      favorites: favorites.size,
      views: news.reduce((acc, item) => acc + item.views, 0),
    }
  }, [news, favorites])

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Open link
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Add new item
  const handleAddNews = (
    newItem: Omit<NewsItem, "id" | "date" | "views" | "likes">
  ) => {
    const item: NewsItem = {
      ...newItem,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
    }
    setNews((prev) => [item, ...prev])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-xhs-gradient opacity-95" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/images/hero-running.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  跑步资讯收集
                </h1>
              </div>
              <p className="text-white/80 text-sm sm:text-base max-w-md">
                精选小红书跑步内容，马拉松、训练、装备一站式获取
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-white/70 text-xs mb-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  资讯
                </div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-white/70 text-xs mb-1">
                  <Heart className="h-3.5 w-3.5" />
                  收藏
                </div>
                <div className="text-2xl font-bold text-white">{stats.favorites}</div>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center hidden sm:block">
                <div className="flex items-center justify-center gap-1.5 text-white/70 text-xs mb-1">
                  <Users className="h-3.5 w-3.5" />
                  浏览
                </div>
                <div className="text-2xl font-bold text-white">
                  {(stats.views / 10000).toFixed(1)}w
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat as Category)}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {showFavoritesOnly
              ? "我的收藏"
              : selectedCategory === "all"
              ? "全部资讯"
              : selectedCategory === "marathon"
              ? "马拉松"
              : selectedCategory === "training"
              ? "训练"
              : selectedCategory === "gear"
              ? "装备"
              : "慢跑"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredNews.length})
            </span>
          </h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="rounded-full shadow-lg shadow-xhs-red/25"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            添加资讯
          </Button>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredNews.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NewsCard
                  item={item}
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenLink={openLink}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            type={showFavoritesOnly ? "favorites" : searchQuery ? "search" : "default"}
            onAdd={() => {
              setShowFavoritesOnly(false)
              setSearchQuery("")
              setSelectedCategory("all")
            }}
            onClear={() => setSearchQuery("")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>跑步资讯收集工具 - 让跑步资讯触手可及</p>
        </div>
      </footer>

      {/* Add Dialog */}
      <AddNewsDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddNews}
      />
    </div>
  )
}

export default App
