import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { CaseStudies } from "@/components/CaseStudies";
import { Packages } from "@/components/Packages";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <CaseStudies />
        <Packages />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
