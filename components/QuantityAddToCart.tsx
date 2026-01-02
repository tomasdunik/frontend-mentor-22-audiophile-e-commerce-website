"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  item: {
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function QuantityAddToCart({ item }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => Math.min(10, q + 1));

  const handleAddToCart = () => {
    addItem(item, quantity);
  };

  return (
    <div className="flex gap-4">
      <div className="bg-grey-light tracking-1 flex h-12 w-fit items-center text-xs leading-18 font-bold">
        <button
          className="text-black-25 hover:text-orange h-12 w-10 cursor-pointer"
          onClick={handleDecrease}
          type="button"
        >
          -
        </button>
        <p className="w-10 text-center">{quantity}</p>
        <button
          className="text-black-25 hover:text-orange h-12 w-10 cursor-pointer"
          onClick={handleIncrease}
          type="button"
        >
          +
        </button>
      </div>

      <button
        className="button-primary--orange"
        type="button"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
