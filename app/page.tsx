import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CaseStudies } from "@/components/case-studies";
import { About } from "@/components/about";
import { StickyFooter } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseStudies />
        <About />
        <StickyFooter />
      </main>
    </>
  );
}
