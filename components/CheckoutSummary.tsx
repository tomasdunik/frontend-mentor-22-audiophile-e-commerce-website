"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { formatPrice } from "../utils/formatPrice";

const SHIPPING = 50;
const VAT_RATE = 0.2;

export default function CheckoutSummary() {
  const { items } = useCart();

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const vat = Math.round(total * VAT_RATE);
  const grandTotal = total + SHIPPING;

  return (
    <>
      <div className="flex flex-col gap-8 rounded-lg bg-white px-6 pt-[30px] pb-8 md:px-[27px] md:pb-[30px] lg:h-fit lg:w-[350px] lg:px-8 lg:pt-8 lg:pb-8">
        <h2 className="tracking-1-29 text-lg leading-25 font-bold">SUMMARY</h2>

        {items.length === 0 ? (
          <p className="text-md text-black-50 leading-25 font-medium">
            Cart is empty
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-16 rounded-lg"
                  />
                  <div className="flex w-full justify-between">
                    <div>
                      <p className="text-md leading-25 font-bold">
                        {item.nameCart || item.name}
                      </p>
                      <p className="text-black-50 text-sm leading-25 font-bold">
                        $ {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="text-md text-black-50 leading-25 font-bold">
                      x{item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="text-md text-black-50 leading-25 font-medium">
                    TOTAL
                  </p>
                  <p className="text-lg leading-25 font-bold">
                    $ {formatPrice(total)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md text-black-50 leading-25 font-medium">
                    SHIPPING
                  </p>
                  <p className="text-lg leading-25 font-bold">
                    $ {formatPrice(SHIPPING)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md text-black-50 leading-25 font-medium">
                    VAT (INCLUDED)
                  </p>
                  <p className="text-lg leading-25 font-bold">
                    $ {formatPrice(vat)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-md text-black-50 leading-25 font-medium">
                  GRAND TOTAL
                </p>
                <p className="text-orange text-lg leading-25 font-bold">
                  $ {formatPrice(grandTotal)}
                </p>
              </div>
            </div>

            <button
              className="button-primary--orange w-full"
              type="submit"
              form="checkout-form"
              disabled={items.length === 0}
            >
              CONTINUE &amp; PAY
            </button>
          </>
        )}
      </div>
    </>
  );
}
