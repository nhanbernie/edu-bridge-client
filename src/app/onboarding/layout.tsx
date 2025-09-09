import { MainLayout } from "@/components/layouts";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return <MainLayout footer={false}>{children}</MainLayout>;
};

export default OnboardingLayout;
