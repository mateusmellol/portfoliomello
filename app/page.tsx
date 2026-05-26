import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CaseStudies } from "@/components/case-studies";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseStudies />
      </main>
    </>
  );
}
