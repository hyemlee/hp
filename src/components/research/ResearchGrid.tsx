import ResearchCard from './ResearchCard'

interface ResearchGridProps {
  items: { title: string; description: string; tags: string[]; focus?: string }[]
}

export default function ResearchGrid({ items }: ResearchGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <ResearchCard key={item.title} {...item} />
      ))}
    </div>
  )
}
