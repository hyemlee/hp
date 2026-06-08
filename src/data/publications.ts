import { paperRecords, patentRecords } from './publicationRecords'

export interface LocalizedText {
  ko: string
  en: string
}

export interface PublicationAuthor {
  name: string
  highlight?: boolean
}

export interface PaperPublication {
  id: string
  year: number | null
  title: LocalizedText
  journal: string
  publicationType?: string
  status?: LocalizedText
  authors: PublicationAuthor[]
  url?: string
}

export interface PatentPublication {
  id: string
  year: number
  title: LocalizedText
  inventors: string[]
  country: LocalizedText
  registrationNumber: string
  url?: string
}

export const papers: PaperPublication[] = paperRecords
export const patents: PatentPublication[] = patentRecords
