import { Hero } from "@/components/hero";
import { WhyChoose } from "@/components/why-choose/WhyChoose";
import { ManufacturingJourney } from "@/components/manufacturing";
import { FinalCTA } from "@/components/cta";
import { AdvancedFacility } from "@/components/AdvancedFacility/AdvancedFacility";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Hero />
      <WhyChoose />
      <ManufacturingJourney />
      <AdvancedFacility />
      {/* Other sections will follow here */}
      <FinalCTA />
    </main>
  );
}
