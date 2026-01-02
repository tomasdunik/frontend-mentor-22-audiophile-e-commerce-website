"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const savedItems = window.localStorage.getItem("cartItems");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("cartItems", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [items]);

  const setQuantity = (slug: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.slug !== slug);
      }
      return prevItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item,
      );
    });
  };

  const addItem = (itemToAdd: Omit<CartItem, "quantity">, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.slug === itemToAdd.slug,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.slug === itemToAdd.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevItems, { ...itemToAdd, quantity }];
    });
  };

  const clear = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, setQuantity, clear, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
