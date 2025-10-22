import { EBMainLayout } from "@/components/layouts";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return <EBMainLayout footer={true}>{children}</EBMainLayout>;
};

export default OnboardingLayout;
