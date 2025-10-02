import { EBLandingLayout } from "@/components/layouts";
import { CTASection, FeatureSection, HeroSection } from "./components";
const MarketingFeature = () => {
  return (
    <EBLandingLayout>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </EBLandingLayout>
  );
};

export default MarketingFeature;
