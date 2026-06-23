const TRUST_BADGES = [
  'Personalized Beauty Advice',
  'Expert Guides',
  'Trusted Recommendations',
  'Confidence That Shows',
]

export default function HeroLeft() {
  return (
    <div className="flex flex-col flex-1 justify-center px-10 pb-16 pt-4">
      {/* Headline */}
      <h1 className="text-cream font-bold leading-tight text-5xl lg:text-6xl xl:text-7xl mb-5">
        Your Beauty,
        <br />
        <span className="text-mint italic font-bold">Perfectly</span>{' '}
        <span className="text-cream">Guided</span>
      </h1>

      {/* Subtext */}
      <p className="text-cream/70 text-lg font-normal mb-8 max-w-md">
        Personalized beauty guidance for every you.
      </p>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 mb-10">
        {TRUST_BADGES.map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 border border-mint/25 bg-white/5 rounded-full px-4 py-2"
          >
            <span className="text-mint text-[10px]">✦</span>
            <span className="text-cream/80 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4 flex-wrap">
        <button className="bg-mint text-forest font-semibold px-8 py-3 rounded-full hover:bg-mint/90 transition-colors text-sm">
          Book a Consultation
        </button>
        <button className="flex items-center gap-2 text-cream border border-cream/30 px-6 py-3 rounded-full hover:border-cream/60 transition-colors text-sm">
          <span className="w-5 h-5 rounded-full border border-cream/50 flex items-center justify-center text-[10px]">
            ▶
          </span>
          Watch Our Video
        </button>
      </div>
    </div>
  )
}
