"use client";

import { LandingLayout } from "@/components/layouts";
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
