import ProductLike from "./ProductLike";

type OtherProduct = {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
};

type ProductLikeBoxProps = {
  products: OtherProduct[];
};

const ProductLikeBox = ({ products }: ProductLikeBoxProps) => {
  return (
    <section className="mb-[120px] px-6 md:px-10 lg:mx-auto lg:mb-[160px] lg:max-w-[1190px]">
      <p className="tracking-0-86 md:tracking-1-14 mb-10 text-xl leading-36 font-bold uppercase md:mb-14 md:text-3xl lg:mb-16">
        You May Also Like
      </p>
      <div className="flex flex-col gap-14 md:flex-row md:gap-[11px] lg:gap-[30px]">
        {products.map((product) => (
          <ProductLike
            key={product.slug}
            slug={product.slug}
            name={product.name}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductLikeBox;
