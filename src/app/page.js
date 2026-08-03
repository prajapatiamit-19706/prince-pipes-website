import { Hero } from "@/components/hero";
import { WhyChoose } from "@/components/why-choose/WhyChoose";
import { Manufacturing } from "@/components/manufacturing/Manufacturing";
import { AdvancedFacility } from "@/components/manufacturing/AdvancedFacility";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <WhyChoose />
      <Manufacturing />
      <AdvancedFacility />
      {/* Other sections will follow here */}
    </main>
  );
}
