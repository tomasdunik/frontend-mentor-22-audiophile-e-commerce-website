import Category from "../../../components/Category";
import About from "../../../components/About";
import ButtonGoBack from "../../../components/ButtonGoBack";
import Image from "next/image";
import ProductLikeBox from "../../../components/ProductLikeBox";
import { notFound } from "next/navigation";
import data from "../../../public/data.json";
import QuantityAddToCart from "../../../components/QuantityAddToCart";
import { Metadata } from "next";
import { formatPrice } from "../../../utils/formatPrice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = data.find((product) => product.slug === slug);

  if (!product) {
    return {
      title: "404 | Audiophile",
    };
  }

  return {
    title: `${product.name} | Audiophile`,
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
          <div className="relative mb-8 aspect-327/327 w-full overflow-hidden rounded-lg md:mb-0 md:aspect-281/480 md:min-w-[281px] lg:aspect-540/560 lg:min-w-[540px]">
            <Image
              src={img(product.image.mobile)}
              alt={product.name}
              fill
              className="object-cover md:hidden"
              priority
            />
            <Image
              src={img(product.image.tablet)}
              alt={product.name}
              fill
              className="hidden object-cover md:block lg:hidden"
              priority
            />
            <Image
              src={img(product.image.desktop)}
              alt={product.name}
              fill
              className="hidden object-cover lg:block"
              priority
            />
          </div>
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
              $ {formatPrice(product.price)}
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
            <div className="relative aspect-327/174 w-full overflow-hidden rounded-lg md:aspect-277/174 lg:aspect-445/280">
              <Image
                src={img(product.gallery.first.mobile)}
                alt={`${product.name} gallery 1`}
                fill
                className="object-cover md:hidden"
              />
              <Image
                src={img(product.gallery.first.tablet)}
                alt={`${product.name} gallery 1`}
                fill
                className="hidden object-cover md:block lg:hidden"
              />
              <Image
                src={img(product.gallery.first.desktop)}
                alt={`${product.name} gallery 1`}
                fill
                className="hidden object-cover lg:block"
              />
            </div>
            <div className="relative aspect-327/174 w-full overflow-hidden rounded-lg md:aspect-277/174 lg:aspect-445/280">
              <Image
                src={img(product.gallery.second.mobile)}
                alt={`${product.name} gallery 2`}
                fill
                className="object-cover md:hidden"
              />
              <Image
                src={img(product.gallery.second.tablet)}
                alt={`${product.name} gallery 2`}
                fill
                className="hidden object-cover md:block lg:hidden"
              />
              <Image
                src={img(product.gallery.second.desktop)}
                alt={`${product.name} gallery 2`}
                fill
                className="hidden object-cover lg:block"
              />
            </div>
          </div>
          <div className="relative aspect-327/368 w-full overflow-hidden rounded-lg md:aspect-395/368 md:flex-[0.585] lg:aspect-635/592 lg:flex-[0.587]">
            <Image
              src={img(product.gallery.third.mobile)}
              alt={`${product.name} gallery 3`}
              fill
              className="object-cover md:hidden"
            />
            <Image
              src={img(product.gallery.third.tablet)}
              alt={`${product.name} gallery 3`}
              fill
              className="hidden object-cover md:block lg:hidden"
            />
            <Image
              src={img(product.gallery.third.desktop)}
              alt={`${product.name} gallery 3`}
              fill
              className="hidden object-cover lg:block"
            />
          </div>
        </div>
      </div>{" "}
      <ProductLikeBox products={othersWithCategory} />
      <Category />
      <About />
    </>
  );
};

export default page;
