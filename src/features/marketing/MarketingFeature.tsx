import LandingLayout from "@/layouts/LandingLayout";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";

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
