import { Header } from "@/components/layout/Header"; // Assuming @ is configured for src path
import HeroSection from "@/components/custom/HeroSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      {/* 
        The Header is absolutely positioned and will overlay the HeroSection.
        HeroSection creates its own full-screen context.
      */}
    </main>
  );
}
