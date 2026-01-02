"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useState } from "react";

const SHIPPING = 50;

const CompletOrderModal = () => {
  const router = useRouter();
  const { items } = useCart();
  const [showAll, setShowAll] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const grandTotal = total + SHIPPING;

  const displayedItems = showAll ? items : items.slice(0, 1);
  const otherCount = items.length - 1;

  return (
    <aside className="mx-6 rounded-lg bg-white md:mx-[114px] lg:w-[540px]">
      <div className="px-8 py-8 md:px-12 md:py-12">
        <svg
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6 md:mb-8"
        >
          <g fill="none" fillRule="evenodd">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              d="m20.754 33.333 6.751 6.751 15.804-15.803"
            />
          </g>
        </svg>
        <div className="md>gap-6 mb-6 flex flex-col gap-4 md:mb-8">
          <p className="tracking-0-86 md:tracking-1-14 text-xl leading-28 font-bold md:text-3xl md:leading-36">
            THANK YOU
            <br /> FOR YOUR ORDER
          </p>
          <p className="text-black-50 text-md leading-25 font-medium">
            You will receive an email confirmation shortly.
          </p>
        </div>
        <div className="mb-6 md:mb-[46px] md:flex md:flex-row">
          <div className="bg-grey-light rounded-t-lg px-6 pt-[25px] pb-[25px] md:min-w-[246px] md:rounded-t-none md:rounded-l-lg">
            <div className="flex flex-col gap-4">
              {displayedItems.map((item, idx) => (
                <div className="flex gap-4" key={item.slug + idx}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px]"
                  />
                  <div className="flex w-full justify-between pb-3">
                    <div>
                      <p className="text-md leading-25 font-bold">
                        {item.name}
                      </p>
                      <p className="text-black-50 text-sm leading-25 font-bold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-black-50 text-md leading-25 font-bold">
                      x{item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {!showAll && otherCount > 0 && (
                <p className="text-xxs text-black-50 tracking--0-21 border-t border-[#97979733] pt-3 text-center leading-16 font-bold">
                  <span
                    className="cursor-pointer underline hover:no-underline"
                    onClick={() => setShowAll(true)}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") setShowAll(true);
                    }}
                  >
                    and {otherCount} other item{otherCount > 1 ? "s" : ""}
                  </span>
                </p>
              )}
              {showAll && items.length > 1 && (
                <p className="text-xxs text-black-50 tracking--0-21 border-t border-[#97979733] pt-3 text-center leading-16 font-bold">
                  <span
                    className="cursor-pointer underline hover:no-underline"
                    onClick={() => setShowAll(false)}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") setShowAll(false);
                    }}
                  >
                    View less
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-end rounded-b-lg bg-black pt-[15px] pb-[19px] pl-6 md:min-w-[198px] md:gap-2 md:rounded-tr-lg md:rounded-b-none md:rounded-br-lg md:pt-[41px] md:pb-[42px]">
            <p className="text-md text-white-50 leading-25 font-medium">
              GRAND TOTAL
            </p>
            <p className="text-lg leading-25 font-bold text-white">
              ${grandTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          className="button-primary--orange w-full"
          onClick={() => router.push("/")}
        >
          BACK TO HOME
        </button>
      </div>
    </aside>
  );
};

export default CompletOrderModal;
