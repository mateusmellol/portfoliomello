import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CaseStudies } from "@/components/case-studies";
import { About } from "@/components/about";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseStudies />
        <About />
      </main>
    </>
  );
}
