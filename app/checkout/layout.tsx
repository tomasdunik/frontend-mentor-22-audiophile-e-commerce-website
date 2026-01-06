import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Audiophile",
  description:
    "Complete your purchase of premium audio equipment. Secure checkout with multiple payment options.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
