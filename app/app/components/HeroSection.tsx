import { Button } from "@/components/ui/button";
import USMap from "@/app/components/USMap";
import { Gasoek_One } from "next/font/google";
import { Location } from "@/utils/supabase/locations";

const gasoekOne = Gasoek_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface HeroSectionProps {
  locations: Location[];
}

export default function HeroSection({ locations }: HeroSectionProps) {
  return (
    <section className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 md:px-8 bg-background">
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        Shop smarter with{" "}
        <span
          className={`${gasoekOne.className} font-extrabold text-[#ffc579]`}
        >
          Eggconomics
        </span>
        .
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mt-4 text-center">
        Compare egg prices across thousands of locations and stores nationwide
        to find the best deals.
      </p>

      <div className="w-full max-w-6xl overflow-hidden p-4 flex items-center justify-center m-8">
        <USMap locations={locations} />
      </div>

      <Button
        asChild
        className="mt-6 px-6 py-3 h-auto rounded-lg text-lg transition bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <a href="/locations">View Map</a>
      </Button>
    </section>
  );
}