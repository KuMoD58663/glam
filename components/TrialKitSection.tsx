import AnimateIn from './AnimateIn'
import Button from './Button'

export default function TrialKitSection() {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-20">
        <AnimateIn>
          <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
            {/* Full-section banner image (background + product + feature copy from Figma) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.figma.com/api/mcp/asset/26ff52aa-2aa9-495c-8e4f-1d43ac8296d1"
              alt="Discover Your Glow - GlamGuider Trial Kits: handpicked bestsellers perfect for travel or as a gift"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Interactive CTA overlay matches Figma button position (bottom-right) */}
            <Button href="/trial-kit" arrow className="absolute right-10 bottom-8">
              Check Trial Kits
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
