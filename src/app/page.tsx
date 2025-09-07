"use client";

import { useAuth } from "@/contexts/AuthContext";
import MarketingPage from "./(unauthenticated)/(marketing)/page";

export default function MainPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <MarketingPage />;
}
