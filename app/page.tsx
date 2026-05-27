import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CaseStudies } from "@/components/case-studies";
import { BookStackSection } from "@/components/book-stack-section";
import { StickyFooter } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseStudies />
        <BookStackSection />
        <StickyFooter />
      </main>
    </>
  );
}
