const FEATURES = [
  {
    icon: '◈',
    title: 'Tailored for You',
    desc: 'Beauty guidance that fits your unique needs.',
  },
  {
    icon: '◈',
    title: 'Expert Guidance',
    desc: 'Learn from experienced beauty professionals.',
  },
  {
    icon: '◈',
    title: 'Curated Just for You',
    desc: 'Handpicked products & routines that work.',
  },
  {
    icon: '◈',
    title: 'Real Results',
    desc: 'Feel confident, beautiful, and unstoppable.',
  },
]

export default function FeatureStrip() {
  return (
    <div className="bg-forest border-t border-mint/10 px-10 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {FEATURES.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-2">
            <span className="text-mint text-xl">{icon}</span>
            <h3 className="text-cream font-semibold text-sm">{title}</h3>
            <p className="text-cream/60 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
