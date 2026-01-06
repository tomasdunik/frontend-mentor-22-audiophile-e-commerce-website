import Link from "next/link";
import Image from "next/image";

type ProductLikeProps = {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
};

const ProductLike = ({ slug, name, image, category }: ProductLikeProps) => {
  const img = (p: string) => p.replace("./assets", "/images");

  return (
    <div className="flex flex-col items-center md:gap-0">
      <div className="relative mb-8 aspect-327/120 w-full overflow-hidden rounded-lg md:mb-10 md:aspect-223/318 lg:aspect-350/318">
        <Image
          src={img(image.mobile)}
          alt={name}
          fill
          className="object-cover md:hidden"
        />
        <Image
          src={img(image.tablet)}
          alt={name}
          fill
          className="hidden object-cover md:block lg:hidden"
        />
        <Image
          src={img(image.desktop)}
          alt={name}
          fill
          className="hidden object-cover lg:block"
        />
      </div>
      <p className="tracking-1-71 mb-8 text-xl leading-33 font-bold uppercase">
        {name}
      </p>
      <Link href={`/${category}/${slug}`} className="button-primary--orange">
        See Product
      </Link>
    </div>
  );
};

export default ProductLike;
