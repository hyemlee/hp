import type { ResearchItem, ProductItem, Member, NewsItem } from '../types/api'
import { members } from '../data/members'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Research API
export async function fetchResearchItems(): Promise<ResearchItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/research`)
    if (!response.ok) throw new Error('Failed to fetch research items')
    return await response.json()
  } catch (error) {
    console.error('Error fetching research:', error)
    return getMockResearchItems()
  }
}

// Products API
export async function fetchProducts(): Promise<ProductItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return getMockProducts()
  }
}

// Members API
export async function fetchMembers(): Promise<Member[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/members`)
    if (!response.ok) throw new Error('Failed to fetch members')
    return await response.json()
  } catch (error) {
    console.error('Error fetching members:', error)
    return getMockMembers()
  }
}

// News API
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/news`)
    if (!response.ok) throw new Error('Failed to fetch news')
    return await response.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    return getMockNews()
  }
}

// Mock data fallbacks
function getMockResearchItems(): ResearchItem[] {
  return [
    {
      id: '1',
      title: 'AI-Powered TB Detection',
      focus: 'Medical AI',
      description: 'Automated tuberculosis detection using deep learning on chest X-rays for rapid diagnosis in resource-limited settings.',
      tags: ['AI/ML', 'Medical Imaging', 'Diagnostics'],
    },
    {
      id: '2',
      title: 'Mycobacterium Identification Platform',
      focus: 'Microbiological Analysis',
      description: 'Real-time identification of mycobacterial species using advanced computational biology and genomic analysis.',
      tags: ['Genomics', 'Classification', 'Research'],
    },
    {
      id: '3',
      title: 'Drug Susceptibility Testing',
      focus: 'Clinical Research',
      description: 'High-throughput screening system for antimicrobial resistance profiling in tuberculosis treatment planning.',
      tags: ['Resistance Testing', 'Automation', 'Pharma'],
    },
    {
      id: '4',
      title: 'Mobile Health Integration',
      focus: 'Digital Health',
      description: 'Cloud-connected platform for specimen tracking, result reporting, and epidemiological surveillance at point-of-care.',
      tags: ['mHealth', 'Cloud', 'Integration'],
    },
    {
      id: '5',
      title: 'Infection Control Analytics',
      focus: 'Public Health',
      description: 'Data-driven insights for institutional infection control protocols and outbreak detection in healthcare settings.',
      tags: ['Analytics', 'Epidemiology', 'Public Health'],
    },
    {
      id: '6',
      title: 'Quality Assurance Framework',
      focus: 'Standards & Compliance',
      description: 'ISO 13485, CLIA-aligned quality management system for clinical laboratory diagnostics and regulatory compliance.',
      tags: ['QA/QC', 'Compliance', 'Validation'],
    },
  ]
}

function getMockProducts(): ProductItem[] {
  return [
    {
      id: '1',
      title: 'MycoDI-X',
      description: 'AI-powered tuberculosis detection system for rapid, accurate diagnosis from chest radiographs in clinical and field settings.',
      tags: ['Diagnostics', 'AI/ML', 'Clinical'],
    },
    {
      id: '2',
      title: 'MycoDI Lab',
      description: 'Integrated laboratory management platform for specimen processing, result reporting, and quality assurance workflows.',
      tags: ['Lab Management', 'Software', 'Compliance'],
    },
    {
      id: '3',
      title: 'MycoDI Connect',
      description: 'Cloud-based data integration and surveillance system connecting diagnostic nodes for epidemiological tracking and outbreak detection.',
      tags: ['Cloud', 'Public Health', 'Analytics'],
    },
    {
      id: '4',
      title: 'MycoDI Training',
      description: 'Comprehensive platform for operator certification, quality assurance, and continuous professional development in TB diagnostics.',
      tags: ['Training', 'Education', 'Certification'],
    },
  ]
}

function getMockMembers(): Member[] {
  return members
}

function getMockNews(): NewsItem[] {
  return [
    {
      id: '1',
      title: 'MycoDx 선행 연구 공개',
      date: '2026-06-01',
      summary: '연구팀이 최신 실험 플랫폼 아키텍처를 공개하며 연구 워크플로우 투명성을 강조했습니다.',
    },
    {
      id: '2',
      title: '제품 베타 테스트 시작',
      date: '2026-05-15',
      summary: 'Insight Dashboard의 초기 베타 테스트가 연구 파트너 그룹과 함께 시작되었습니다.',
    },
    {
      id: '3',
      title: '팀 멤버 확장',
      date: '2026-04-20',
      summary: '새로운 UX 리서처와 데이터 엔지니어가 합류하여 제품 설계 역량을 강화했습니다.',
    },
  ]
}
