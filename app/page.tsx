import Category from "../components/Category";
import About from "../components/About";
import Image from "next/image";
import imageEarphonesYX1 from "../public/images/home/mobile/image-earphones-yx1.jpg";
import imageEarphonesYX1Tablet from "../public/images/home/tablet/image-earphones-yx1.jpg";
import imageEarphonesYX1Desktop from "../public/images/home/desktop/image-earphones-yx1.jpg";
import imageSpeakerZX9 from "../public/images/home/mobile/image-speaker-zx9.png";
import imageSpeakerZX9Tablet from "../public/images/home/tablet/image-speaker-zx9.png";
import imageSpeakerZX9Desktop from "../public/images/home/desktop/image-speaker-zx9.png";
import imageHero from "../public/images/home/desktop/image-hero-portrait.png";

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Audiophile",
  description: "Audiophile is an all in one stop to fulfill your audio needs.",
};

export default function Home() {
  return (
    <>
      <section className="mb-10 bg-[url('../public/images/home/mobile/image-header.jpg')] bg-cover bg-[center_-83px] md:mb-24 md:bg-[url('../public/images/home/tablet/image-header.jpg')] md:bg-[center_-150px] md:bg-no-repeat lg:mb-[120px] lg:overflow-hidden lg:bg-[#121212] lg:bg-none lg:bg-center">
        <div className="md:px-10 lg:mx-auto lg:flex lg:max-h-[632px] lg:max-w-[1190px] lg:items-center lg:gap-[45px]">
          <div className="flex flex-col items-center px-6 pt-[108px] pb-[112px] text-center md:px-0 md:pt-[126px] md:pb-[167px] lg:z-1 lg:max-w-[398px] lg:items-start lg:text-left">
            <p className="text-white-50 tracking-10 pb-4 text-sm leading-19 uppercase md:pb-6">
              New Product
            </p>
            <h1 className="tracking-1-29 md:tracking-2 pb-6 text-[2.25rem] leading-40 font-bold text-white uppercase md:px-[185px] md:text-5xl md:leading-58 lg:px-0">
              XX99 Mark II Headphones
            </h1>
            <p className="text-white-75 text-md pb-7 leading-25 font-medium md:px-[149px] md:pb-10 lg:max-w-[349px] lg:px-0">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link
              href="/headphones/xx99-mark-two-headphones"
              className="button-primary--orange"
            >
              See Product
            </Link>
          </div>
          <Image
            src={imageHero}
            alt=""
            className="hidden lg:z-0 lg:block lg:translate-y-[30px]"
          />
        </div>
      </section>
      <Category />
      <section className="px-6 pb-[120px] md:px-10 md:pb-24 lg:mx-auto lg:max-w-[1190px] lg:pb-[200px]">
        <div className="bg-orange mb-6 rounded-lg bg-[url('../public/images/home/desktop/pattern-circles.svg')] bg-cover bg-[center_-119px] md:mb-8 md:bg-auto md:bg-[center_-285px] md:bg-no-repeat lg:mb-12 lg:flex lg:items-center lg:justify-center lg:gap-[138px] lg:overflow-hidden lg:bg-[-170px_-50px]">
          <picture>
            <source
              media="(min-width: 1110px)"
              srcSet={imageSpeakerZX9Desktop.src}
            />
            <source
              media="(min-width: 768px)"
              srcSet={imageSpeakerZX9Tablet.src}
            />
            <Image
              className="mx-auto w-[172px] pt-[55px] pb-8 md:w-[197px] md:pb-16 lg:mx-0 lg:w-[410px] lg:translate-y-[80px] lg:pt-0"
              src={imageSpeakerZX9}
              alt="ZX9 Speaker"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            />
          </picture>
          <div className="flex flex-col items-center px-[23px] pb-[55px] text-center md:px-[170px] md:pb-16 lg:max-w-[349px] lg:items-start lg:px-0 lg:pt-[133px] lg:pb-[124px] lg:text-left">
            <p className="tracking-1-29 md:tracking-2 pb-6 text-[2.25rem] leading-40 font-bold text-white md:text-5xl md:leading-58">
              ZX9 SPEAKER
            </p>
            <p className="text-white-75 text-md pb-6 leading-25 font-medium md:pb-10">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link className="button-primary--black" href="speakers/zx9-speaker">
              See Product
            </Link>
          </div>
        </div>
        <div className="mb-6 rounded-lg bg-[url('../public/images/home/mobile/image-speaker-zx7.jpg')] bg-cover bg-center md:mb-8 md:bg-[url('/images/home/tablet/image-speaker-zx7.jpg')] lg:mb-12 lg:bg-[url('/images/home/desktop/image-speaker-zx7.jpg')]">
          <div className="px-6 py-[101px] md:px-[62px] lg:px-[95px]">
            <p className="tracking-2 pb-8 text-2xl leading-38 font-bold">
              ZX7 SPEAKER
            </p>
            <Link className="button-outline" href="speakers/zx7-speaker">
              See Product
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-[11px] lg:gap-[30px]">
          <picture className="md:w-1/2">
            <source
              media="(min-width: 1110px)"
              srcSet={imageEarphonesYX1Desktop.src}
            />
            <source
              media="(min-width: 768px)"
              srcSet={imageEarphonesYX1Tablet.src}
            />
            <Image
              className="w-full rounded-lg md:h-auto"
              src={imageEarphonesYX1}
              alt="YX1 Earphones"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            />
          </picture>
          <div className="bg-grey-light rounded-lg px-6 py-[41px] md:w-1/2 md:px-[41px] md:py-[101px] lg:px-[96px]">
            <p className="tracking-2 pb-8 text-2xl leading-38 font-bold">
              YX1 EARPHONES
            </p>
            <Link className="button-outline" href="earphones/yx1-earphones">
              See Product
            </Link>
          </div>
        </div>
      </section>
      <About />
    </>
  );
}
