import { Hero } from "@/components/hero";
import { WhyChoose } from "@/components/why-choose/WhyChoose";
import { Manufacturing } from "@/components/manufacturing/Manufacturing";
import { AdvancedFacility } from "@/components/manufacturing/AdvancedFacility";
import { FinalCTA } from "@/components/cta";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Hero />
      <WhyChoose />
      <Manufacturing />
      <AdvancedFacility />
      {/* Other sections will follow here */}
      <FinalCTA />
    </main>
  );
}
