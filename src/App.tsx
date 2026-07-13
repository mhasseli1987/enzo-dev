import { Hero } from "./components/Hero";
import { ScrollVideoSection } from "./components/ScrollVideoSection";
import { PortfolioGrid } from "./components/PortfolioGrid";
import { ValueProps } from "./components/ValueProps";
import { ContactCTA } from "./components/ContactCTA";

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <main>
        <Hero />
        <ScrollVideoSection />
        <PortfolioGrid />
        <ValueProps />
        <ContactCTA />
      </main>
    </>
  );
}
