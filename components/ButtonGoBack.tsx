"use client";

import { useRouter } from "next/navigation";

const ButtonGoBack = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mt-4 mb-6 px-6 md:mt-[33px] md:px-10 lg:mx-auto lg:mt-[79px] lg:mb-14 lg:max-w-[1190px]">
      <button
        onClick={handleGoBack}
        className="text-black-50 text-md hover:text-orange hover:text-orange inline-block cursor-pointer leading-25 font-medium transition-colors duration-150 ease-out"
      >
        Go Back
      </button>
    </div>
  );
};

export default ButtonGoBack;
