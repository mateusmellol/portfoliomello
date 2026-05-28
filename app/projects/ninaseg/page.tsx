import type { Metadata } from "next";
import { Header } from "@/components/header";
import { StickyFooter } from "@/components/footer";
import { NinasegCaseStudy } from "@/components/ninaseg-case-study";

export const metadata: Metadata = {
  title: "NinaSeg | Mateus Mello",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function NinasegPage() {
  return (
    <>
      <Header />
      <NinasegCaseStudy />
      <StickyFooter />
    </>
  );
}
