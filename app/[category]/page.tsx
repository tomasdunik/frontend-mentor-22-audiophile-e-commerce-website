import ProductCard from "../../components/ProductCard";
import Category from "../../components/Category";
import About from "../../components/About";
import data from "@/public/data.json";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type CategoryParam = "earphones" | "headphones" | "speakers";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: { mobile: string; tablet: string; desktop: string };
  category: CategoryParam;
  categoryImage: { mobile: string; tablet: string; desktop: string };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{ quantity: number; item: string }>;
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Array<{
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
    category: CategoryParam;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: raw } = await params;
  const category = raw as CategoryParam;

  if (!["earphones", "headphones", "speakers"].includes(category)) {
    notFound();
  }

  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${heading} | Audiophile`,
    description: `Browse our selection of ${category} at Audiophile.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: raw } = await params;
  const category = raw as CategoryParam;

  if (!["earphones", "headphones", "speakers"].includes(category)) {
    notFound();
  }

  const img = (p: string) => p.replace("./assets", "/images");
  const products = (data as Product[]).filter((p) => p.category === category);

  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div>
      <p className="tracking-2 md:tracking-1-43 mb-16 bg-[#121212] py-8 text-center text-2xl leading-38 font-bold text-white uppercase md:mb-[120px] md:pt-[105px] md:pb-[97px] md:text-4xl md:leading-44 lg:mb-[160px] lg:pt-[98px]">
        {heading}
      </p>
      {products
        .slice()
        .reverse()
        .map((p, idx) => (
          <ProductCard
            key={p.id}
            title={p.name}
            description={p.description}
            isNew={p.new}
            image={{
              mobile: img(p.categoryImage.mobile),
              tablet: img(p.categoryImage.tablet),
              desktop: img(p.categoryImage.desktop),
            }}
            href={`/${p.category}/${p.slug}`}
            reverse={idx % 2 === 1}
          />
        ))}
      <Category />
      <About />
    </div>
  );
}
