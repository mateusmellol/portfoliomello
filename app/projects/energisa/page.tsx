import type { Metadata } from "next";
import { Header } from "@/components/header";
import { StickyFooter } from "@/components/footer";
import { EnergisaCaseStudy } from "@/components/energisa-case-study";

export const metadata: Metadata = {
  title: "Energisa | Mateus Mello",
  description:
    "Redesign que transforma um site institucional em uma experiência de marca com visão de futuro.",
};

export default function EnergisaPage() {
  return (
    <>
      <Header />
      <EnergisaCaseStudy />
      <StickyFooter />
    </>
  );
}
