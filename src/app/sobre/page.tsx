import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/custom/AboutHeroSection';
import AboutStorySection from '@/components/custom/AboutStorySection';
import AboutValuesSection from '@/components/custom/AboutValuesSection';
import AboutTeamSection from '@/components/custom/AboutTeamSection';
import AboutMissionSection from '@/components/custom/AboutMissionSection';
import AboutStatsSection from '@/components/custom/AboutStatsSection';

export default function SobrePage() {
  return (
    <main className="relative">
      <Header />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMissionSection />
      <AboutValuesSection />
      <AboutStatsSection />
      <AboutTeamSection />
      <Footer />
    </main>
  );
} 