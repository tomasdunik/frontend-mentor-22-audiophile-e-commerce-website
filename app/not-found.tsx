import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-6 md:mx-10 lg:mx-auto lg:max-w-[1190px]">
      <div className="flex flex-col items-center py-16 text-center md:py-24 lg:py-32">
        <p className="tracking-10 text-orange mb-4 text-sm leading-19 uppercase">
          404
        </p>
        <h1 className="tracking-2 mb-6 text-2xl leading-38 font-bold uppercase md:text-4xl md:leading-44">
          Page Not Found
        </h1>
        <p className="text-black-50 text-md mx-auto mb-8 max-w-[560px] leading-25 font-medium md:mb-10">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className="button-primary--orange">
          Return Home
        </Link>
      </div>
    </section>
  );
}
