"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../utils/formatPrice";

interface BasketPopUpProps {
  onClose: () => void;
}

const BasketPopUp = ({ onClose }: BasketPopUpProps) => {
  const router = useRouter();
  const { items, setQuantity, clear } = useCart();
  const popupRef = useRef<HTMLDivElement>(null);

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (items.length === 0) {
    return (
      <aside
        ref={popupRef}
        className="absolute top-full right-0 mt-6 mr-6 rounded-lg bg-white md:mt-6 md:mr-10 lg:mt-8 lg:mr-0"
      >
        <p className="tracking-1-29 px-7 py-8 text-lg leading-25 font-bold uppercase md:px-8">
          Cart is empty
        </p>
      </aside>
    );
  }

  return (
    <aside
      ref={popupRef}
      className="absolute top-full right-6 left-6 mt-6 rounded-lg bg-white px-6 pb-8 md:right-0 md:left-auto md:mt-6 md:mr-10 md:min-w-[377px] lg:mt-8 lg:mr-0"
    >
      <div className="flex justify-between py-8">
        <p className="tracking-1-29 text-lg leading-25 font-bold uppercase">
          Cart ({totalCount})
        </p>
        <button
          className="text-md text-black-50 hover:text-orange cursor-pointer leading-25 font-medium underline"
          type="button"
          onClick={clear}
        >
          Remove all
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-16 rounded-lg"
              />
              <div>
                <p className="text-md leading-25 font-bold">{item.name}</p>
                <p className="text-black-50 text-sm leading-25 font-bold">
                  $ {formatPrice(item.price)}
                </p>
              </div>
            </div>

            <div className="bg-grey-light tracking-1 flex h-8 w-fit items-center text-xs leading-18 font-bold">
              <button
                className="text-black-25 hover:text-orange h-8 w-8 cursor-pointer"
                type="button"
                onClick={() => setQuantity(item.slug, item.quantity - 1)}
              >
                -
              </button>
              <p className="w-8 text-center">{item.quantity}</p>
              <button
                className="text-black-25 hover:text-orange h-8 w-8 cursor-pointer"
                type="button"
                onClick={() => setQuantity(item.slug, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-6 flex justify-between">
        <p className="text-md text-black-50 leading-25 font-medium uppercase">
          Total
        </p>
        <p className="text-lg leading-25 font-bold">
          $ {formatPrice(totalPrice)}
        </p>
      </div>

      <button
        className="button-primary--orange w-full"
        type="button"
        onClick={() => {
          onClose();
          router.push("/checkout");
        }}
      >
        Checkout
      </button>
    </aside>
  );
};

export default BasketPopUp;
