import LandingLayout from "@/layouts/LandingLayout";
import { CTASection, FeatureSection, HeroSection } from "./components";
const MarketingFeature = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </LandingLayout>
  );
};

export default MarketingFeature;
