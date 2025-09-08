import "./route.css";
import ClientEntry from "./client-entry";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientEntry />
      {children}
    </>
  );
}
