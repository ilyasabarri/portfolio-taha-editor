import { notFound } from "next/navigation";
import { getServiceBySlug, servicesSlugs } from "@/lib/services-data";
import ServicePageLayout from "@/components/ServicePageLayout";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — Taha El Maanaoui Video Editor`,
    description: service.description,
    openGraph: {
      title: `${service.title} — Taha El Maanaoui`,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageLayout service={service} />;
}
