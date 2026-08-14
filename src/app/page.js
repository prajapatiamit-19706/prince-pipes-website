import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";

const WhyChoose = dynamic(() => import("@/components/why-choose/WhyChoose").then(mod => mod.WhyChoose), { ssr: true });
const ManufacturingJourney = dynamic(() => import("@/components/manufacturing").then(mod => mod.ManufacturingJourney), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/cta").then(mod => mod.FinalCTA), { ssr: true });
const AdvancedFacility = dynamic(() => import("@/components/AdvancedFacility/AdvancedFacility").then(mod => mod.AdvancedFacility), { ssr: true });

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
