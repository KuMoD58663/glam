import Image from 'next/image'

export default function HeroRight() {
  return (
    <div className="relative flex items-center justify-center w-full h-full bg-cream overflow-hidden min-h-[500px]">
      {/* Teal depth blur circle */}
      <div className="absolute w-96 h-96 rounded-full bg-teal/25 blur-3xl pointer-events-none" />

      {/* Sparkle accents */}
      <span className="absolute top-14 right-14 text-mint text-3xl select-none pointer-events-none">✦</span>
      <span className="absolute top-1/3 left-8 text-mint/40 text-base select-none pointer-events-none">✦</span>
      <span className="absolute bottom-20 right-10 text-teal/50 text-xl select-none pointer-events-none">✦</span>
      <span className="absolute bottom-1/3 left-1/4 text-mint/30 text-sm select-none pointer-events-none">✦</span>

      {/* Model photo */}
      <div className="relative z-10 w-64 h-[480px] lg:w-72 lg:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/*
          Placeholder photo — swap src with the real model/makeup photo before launch.
          Suggested local path: /images/hero-model.jpg (portrait, min 400×600px)
        */}
        <Image
          src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80"
          alt="Beauty consultation — personalized guidance"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  )
}
