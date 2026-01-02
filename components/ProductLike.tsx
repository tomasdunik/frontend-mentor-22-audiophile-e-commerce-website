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
      <picture>
        <source media="(min-width: 1110px)" srcSet={img(image.desktop)} />
        <source media="(min-width: 768px)" srcSet={img(image.tablet)} />
        <Image
          className="mb-8 rounded-lg md:mb-10"
          src={img(image.mobile)}
          alt={name}
          width={350}
          height={318}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
        />
      </picture>
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
