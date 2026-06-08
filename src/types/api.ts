export interface ResearchItem {
  id: string
  title: string
  focus: string
  description: string
  tags: string[]
}

export interface ProductItem {
  id: string
  title: string
  description: string
  tags: string[]
}

export interface Member {
  id: string
  name: string
  role: string
  nameEn?: string
  roleEn?: string
}

export interface NewsItem {
  id: string
  title: string
  date: string
  summary: string
}
