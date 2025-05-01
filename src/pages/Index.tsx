
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import TalentSection from "@/components/home/TalentSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EnterpriseSection from "@/components/home/EnterpriseSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <TalentSection />
        <TestimonialsSection />
        <EnterpriseSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
