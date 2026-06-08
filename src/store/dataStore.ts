import { create } from 'zustand'
import type { ResearchItem, ProductItem, Member, NewsItem } from '../types/api'
import {
  fetchResearchItems,
  fetchProducts as fetchProductsAPI,
  fetchMembers as fetchMembersAPI,
  fetchNews as fetchNewsAPI,
} from '../services/api'

interface DataState {
  research: ResearchItem[]
  researchLoading: boolean
  researchError: string | null
  fetchResearch: () => Promise<void>

  products: ProductItem[]
  productsLoading: boolean
  productsError: string | null
  fetchProducts: () => Promise<void>

  members: Member[]
  membersLoading: boolean
  membersError: string | null
  fetchMembers: () => Promise<void>

  news: NewsItem[]
  newsLoading: boolean
  newsError: string | null
  fetchNews: () => Promise<void>
}

export const useDataStore = create<DataState>((set) => ({
  research: [],
  researchLoading: false,
  researchError: null,
  fetchResearch: async () => {
    set({ researchLoading: true, researchError: null })
    try {
      const data = await fetchResearchItems()
      set({ research: data, researchLoading: false })
    } catch (error) {
      set({
        researchError: error instanceof Error ? error.message : 'Failed to fetch research',
        researchLoading: false,
      })
    }
  },

  products: [],
  productsLoading: false,
  productsError: null,
  fetchProducts: async () => {
    set({ productsLoading: true, productsError: null })
    try {
      const data = await fetchProductsAPI()
      set({ products: data, productsLoading: false })
    } catch (error) {
      set({
        productsError: error instanceof Error ? error.message : 'Failed to fetch products',
        productsLoading: false,
      })
    }
  },

  members: [],
  membersLoading: false,
  membersError: null,
  fetchMembers: async () => {
    set({ membersLoading: true, membersError: null })
    try {
      const data = await fetchMembersAPI()
      set({ members: data, membersLoading: false })
    } catch (error) {
      set({
        membersError: error instanceof Error ? error.message : 'Failed to fetch members',
        membersLoading: false,
      })
    }
  },

  news: [],
  newsLoading: false,
  newsError: null,
  fetchNews: async () => {
    set({ newsLoading: true, newsError: null })
    try {
      const data = await fetchNewsAPI()
      set({ news: data, newsLoading: false })
    } catch (error) {
      set({
        newsError: error instanceof Error ? error.message : 'Failed to fetch news',
        newsLoading: false,
      })
    }
  },
}))
