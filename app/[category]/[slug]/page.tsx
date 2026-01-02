import Category from "../../../components/Category";
import About from "../../../components/About";
import ButtonGoBack from "../../../components/ButtonGoBack";
import Image from "next/image";
import ProductLikeBox from "../../../components/ProductLikeBox";
import { notFound } from "next/navigation";
import data from "../../../public/data.json";
import QuantityAddToCart from "../../../components/QuantityAddToCart";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = data.find((product) => product.slug === slug);

  if (!product) {
    return {
      title: "404 | audiophile",
    };
  }

  return {
    title: `${product.name} | audiophile`,
    description: product.description,
  };
}

const page = async ({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) => {
  const { slug, category } = await params;

  const product = data.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  const img = (p: string) => p.replace("./assets", "/images");

  const othersWithCategory = product.others.map((other) => ({
    ...other,
    category: data.find((p) => p.slug === other.slug)?.category || category,
  }));

  return (
    <>
      <ButtonGoBack />
      <div className="px-6 md:flex md:flex-col md:px-10 lg:mx-auto lg:max-w-[1190px]">
        <div className="mb-[88px] flex flex-col items-center md:mb-[120px] md:flex md:flex-row md:gap-[69px] lg:mb-40 lg:gap-[124px]">
          <picture>
            <source
              media="(min-width: 1110px)"
              srcSet={img(product.image.desktop)}
            />
            <source
              media="(min-width: 768px)"
              srcSet={img(product.image.tablet)}
            />
            <Image
              className="mb-8 rounded-lg md:mb-0 md:min-w-[281px] lg:min-w-[540px]"
              src={img(product.image.mobile)}
              alt={product.name}
              width={540}
              height={560}
            />
          </picture>
          <div className="md:flex md:flex-col">
            <p className="tracking-10 text-orange md:text-xxs md:tracking-8-57 mb-6 text-sm leading-19 uppercase md:mb-[17px] md:leading-16 lg:mb-[17px]">
              {product.new && "New Product"}
            </p>
            <p className="tracking-1 md:tracking-1-43 lg:tracking-1-43 mb-6 text-2xl leading-38 font-bold uppercase md:mb-8 md:text-2xl md:leading-32 lg:text-4xl lg:leading-44">
              {product.name}
            </p>
            <p className="text-md text-black-50 mb-6 leading-25 font-medium md:mb-8">
              {product.description}
            </p>
            <p className="tracking-1-29 mb-[31px] text-lg leading-25 font-bold lg:mb-[47px]">
              $ {product.price}
            </p>
            <div className="flex gap-4">
              <QuantityAddToCart
                item={{
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: img(product.image.mobile),
                }}
              />
            </div>
          </div>
        </div>
        <div className="mb-[88px] flex flex-col gap-[88px] md:mb-[120px] md:gap-[120px] lg:mb-[160px] lg:flex-row lg:gap-[125px]">
          <div>
            <p className="tracking-0-86 md:tracking-1-14 mb-6 text-xl leading-36 font-bold uppercase md:mb-8 md:text-3xl">
              Features
            </p>
            <p className="text-md text-black-50 leading-25 font-medium whitespace-pre-line">
              {product.features}
            </p>
          </div>
          <div className="md:flex md:gap-[11px] lg:flex-col lg:gap-0">
            <p className="tracking-0-86 md:tracking-1-14 mb-6 text-xl leading-36 font-bold uppercase md:mb-0 md:min-w-[339px] md:text-3xl lg:mb-8">
              In The Box
            </p>
            <ul aria-label="In The Box">
              {product.includes.map((inc, i) => (
                <li key={i}>
                  <span>{inc.quantity}x</span> {inc.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-[120px] flex flex-col gap-5 md:flex-row md:gap-[18px] lg:mb-[160px] lg:gap-[30px]">
          <div className="flex flex-col gap-5 md:flex-[0.415] lg:flex-[0.413] lg:gap-8">
            <picture>
              <source
                media="(min-width: 1110px)"
                srcSet={img(product.gallery.first.desktop)}
              />
              <source
                media="(min-width: 768px)"
                srcSet={img(product.gallery.first.tablet)}
              />
              <Image
                className="w-full rounded-lg"
                src={img(product.gallery.first.mobile)}
                alt={product.name}
                width={500}
                height={300}
              />
            </picture>
            <picture>
              <source
                media="(min-width: 1110px)"
                srcSet={img(product.gallery.second.desktop)}
              />
              <source
                media="(min-width: 768px)"
                srcSet={img(product.gallery.second.tablet)}
              />
              <Image
                className="w-full rounded-lg"
                src={img(product.gallery.second.mobile)}
                alt={product.name}
                width={500}
                height={300}
              />
            </picture>
          </div>
          <picture className="g:flex-[0.587] md:flex-[0.585]">
            <source
              media="(min-width: 1110px)"
              srcSet={img(product.gallery.third.desktop)}
            />
            <source
              media="(min-width: 768px)"
              srcSet={img(product.gallery.third.tablet)}
            />
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={img(product.gallery.third.mobile)}
              alt={product.name}
              width={700}
              height={600}
            />
          </picture>
        </div>
      </div>{" "}
      <ProductLikeBox products={othersWithCategory} />
      <Category />
      <About />
    </>
  );
};

export default page;
