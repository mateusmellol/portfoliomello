import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { StickyFooter } from "@/components/footer";
import { CaseStudyTemplate } from "@/components/case-study-template";
import {
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
} from "@/lib/case-study-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case não encontrado | Mateus Mello",
    };
  }

  return {
    title: `${caseStudy.title} | Mateus Mello`,
    description: caseStudy.subtitle,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <CaseStudyTemplate
        caseStudy={caseStudy}
        nextCaseStudy={getNextCaseStudy(caseStudy.slug)}
      />
      <StickyFooter />
    </>
  );
}
