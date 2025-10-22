import { EBLandingLayout } from "@/components/layouts";
import { CTASection, FeatureSection, HeroSection } from "./components";
const MarketingFeature = () => {
  return (
    <EBLandingLayout>
      <section id="home" className="scroll-mt-20">
        <HeroSection />
      </section>
      <section id="features" className="scroll-mt-20">
        <FeatureSection />
      </section>
      <section id="contact" className="scroll-mt-20">
        <CTASection />
      </section>
    </EBLandingLayout>
  );
};

export default MarketingFeature;
