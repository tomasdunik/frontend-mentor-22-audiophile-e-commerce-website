import Image from "next/image";
import imageBestGearMobile from "../public/images/shared/mobile/image-best-gear.jpg";
import imageBestGearTablet from "../public/images/shared/tablet/image-best-gear.jpg";
import imageBestGearDesktop from "../public/images/shared/desktop/image-best-gear.jpg";

const About = () => {
  return (
    <section className="px-6 pb-[120px] md:px-10 md:pb-24 lg:mx-auto lg:flex lg:max-w-[1190px] lg:flex-row-reverse lg:items-center lg:gap-[125px] lg:px-10 lg:pb-[200px]">
      <Image
        className="mb-10 rounded-lg md:mb-[63px] md:hidden lg:mb-0"
        src={imageBestGearMobile}
        alt="Best Gear"
        placeholder="blur"
      />
      <Image
        className="mb-10 hidden rounded-lg md:mb-[63px] md:block lg:mb-0 lg:hidden"
        src={imageBestGearTablet}
        alt="Best Gear"
        placeholder="blur"
      />
      <Image
        className="mb-10 hidden rounded-lg md:mb-[63px] lg:mb-0 lg:block"
        src={imageBestGearDesktop}
        alt="Best Gear"
        placeholder="blur"
      />
      <div className="text-center md:px-[58px] lg:px-0 lg:text-left">
        <h4 className="tracking-1 md:tracking-1-43 mb-8 text-2xl leading-38 font-bold uppercase md:text-4xl md:leading-44">
          Bringing you the <span className="text-orange">best</span> audio gear
        </h4>
        <p className="text-black-50 text-md leading-25 font-medium">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
};

export default About;
