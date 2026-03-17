export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  image: string
  category: "marathon" | "training" | "gear" | "jogging" | "default"
  date: string
  views: number
  likes: number
}

export type Category = "all" | "marathon" | "training" | "gear" | "jogging"
