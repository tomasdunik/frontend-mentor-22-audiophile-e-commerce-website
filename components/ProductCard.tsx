import Link from "next/link";

export type ProductCardProps = {
  title: string;
  description: string;
  isNew?: boolean;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  href?: string;
  reverse?: boolean;
};

const ProductCard = ({
  title,
  description,
  isNew,
  image,
  href = "#",
  reverse = false,
}: ProductCardProps) => {
  return (
    <div
      className={`mb-[120px] flex flex-col items-center gap-[52px] px-6 md:px-10 lg:mx-auto lg:mb-[160px] lg:max-w-[1190px] lg:flex-row lg:gap-[125px] ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      <picture>
        <source media="(min-width: 1110px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <img
          className="h-auto w-full rounded-lg"
          src={image.mobile}
          alt={title}
        />
      </picture>

      <div className="flex flex-col items-center gap-6 md:max-w-[572px] md:gap-0 lg:mt-[109px] lg:mb-[109px] lg:max-w-[445px] lg:items-start">
        {isNew ? (
          <p className="text-orange tracking-10 text-center text-sm leading-19 uppercase md:mb-4">
            NEW PRODUCT
          </p>
        ) : null}
        <p className="tracking-1 md:tracking-1-43 text-center text-2xl leading-38 font-bold uppercase md:mb-8 md:text-4xl md:leading-44 lg:text-left">
          {title}
        </p>
        <p className="text-black-50 text-md text-center leading-25 font-medium md:mb-6 lg:mb-10 lg:text-left">
          {description}
        </p>
        <Link href={href} className="button-primary--orange">
          See Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
