"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonGoBack from "../../components/ButtonGoBack";
import CheckoutSummary from "../../components/CheckoutSummary";
import CompletOrderModal from "../../components/CompletOrderModal";
import { useCart } from "../../components/CartContext";
import IconCashOnDelivery from "../../public/images/checkout/icon-cash-on-delivery.svg";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zip?: string;
  city?: string;
  country?: string;
  eMoneyNumber?: string;
  eMoneyPin?: string;
};

const CheckoutPage = () => {
  const { items } = useCart();
  const [errors, setErrors] = useState<FormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cod">(
    "e-money",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (items.length === 0) {
    return (
      <section className="mx-6 md:mx-10 lg:mx-auto lg:max-w-[1190px]">
        <div className="flex flex-col items-center py-16 text-center md:py-24 lg:py-32">
          <p className="tracking-10 text-orange mb-4 text-sm leading-19 uppercase">
            Empty Cart
          </p>
          <h1 className="tracking-2 mb-6 text-2xl leading-38 font-bold uppercase md:text-4xl md:leading-44">
            Your Cart is Empty
          </h1>
          <p className="text-black-50 text-md mx-auto mb-8 max-w-[560px] leading-25 font-medium md:mb-10">
            Looks like you haven&apos;t added any items to your cart yet. Browse
            our products and find something you love.
          </p>
          <Link href="/" className="button-primary--orange">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newErrors: FormErrors = {};

    const name = (data.get("name") as string | null)?.trim() || "";
    const email = (data.get("email") as string | null)?.trim() || "";
    const phone = (data.get("phone") as string | null)?.trim() || "";
    const address = (data.get("address") as string | null)?.trim() || "";
    const zip = (data.get("zip") as string | null)?.trim() || "";
    const city = (data.get("city") as string | null)?.trim() || "";
    const country = (data.get("country") as string | null)?.trim() || "";
    const eMoneyNumber =
      (data.get("e-money-number") as string | null)?.trim() || "";
    const eMoneyPin = (data.get("e-money-pin") as string | null)?.trim() || "";

    if (!name) newErrors.name = "Required";

    if (!email) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email))
      newErrors.email = "Wrong Format";

    if (!phone) newErrors.phone = "Required";
    else if (!/^\+?[0-9\s-]{7,}$/.test(phone)) newErrors.phone = "Wrong format";

    if (!address) newErrors.address = "Required";

    if (!zip) newErrors.zip = "Required";
    else if (!/^[0-9]{3,10}$/.test(zip)) newErrors.zip = "Wrong Format";

    if (!city) newErrors.city = "Required";
    else if (!/^[A-Za-z\s]+$/.test(city)) newErrors.city = "Wrong Format";

    if (!country) newErrors.country = "Required";
    else if (!/^[A-Za-z\s]+$/.test(country)) newErrors.country = "Wrong Format";

    if (paymentMethod === "e-money") {
      if (!eMoneyNumber) newErrors.eMoneyNumber = "Required";
      else if (!/^[0-9]{6,}$/.test(eMoneyNumber))
        newErrors.eMoneyNumber = "Wrong Format";

      if (!eMoneyPin) newErrors.eMoneyPin = "Required";
      else if (!/^[0-9]{4}$/.test(eMoneyPin))
        newErrors.eMoneyPin = "Wrong Format";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <ButtonGoBack />
      <section className="mx-6 mb-[97px] flex flex-col gap-8 md:mx-10 md:mb-[116px] lg:mx-auto lg:mb-[141px] lg:max-w-[1190px] lg:flex-row lg:gap-[30px] lg:px-10">
        <div className="rounded-lg bg-white px-6 pt-6 pt-[30px] pb-8 md:px-[27px] md:pb-[30px] lg:w-[730px] lg:px-12 lg:pt-[54px] lg:pb-12">
          <h1 className="tracking-1 md:tracking-1-14 mb-8 text-2xl leading-38 font-bold md:mb-[41px] md:text-3xl md:leading-36">
            CHECKOUT
          </h1>
          <form
            action="#"
            method="post"
            id="checkout-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset className="mb-8 md:mb-[53px]">
              <legend className="tracking-0-93 text-orange mb-4 text-xs leading-25 font-bold">
                BILLING DETAILS
              </legend>
              <div className="md:flex md:gap-4">
                <div className="mb-6 flex w-full flex-col gap-[9px]">
                  <label
                    htmlFor="name"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.name ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>Name</span>
                    {errors.name && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Alexei Ward"
                    aria-invalid={!!errors.name}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.name
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
                <div className="mb-6 flex w-full flex-col gap-[9px]">
                  <label
                    htmlFor="email"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.email ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>Email Address</span>
                    {errors.email && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="alexei@mail.com"
                    aria-invalid={!!errors.email}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.email
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
              </div>

              <div className="md:flex">
                <div className="flex flex-col gap-[9px] md:w-1/2 md:pr-2">
                  <label
                    htmlFor="phone"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.phone ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>Phone Number</span>
                    {errors.phone && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+1 202-555-0136"
                    aria-invalid={!!errors.phone}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.phone
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="mb-8 md:mb-[53px]">
              <legend className="tracking-0-93 text-orange mb-4 text-xs leading-25 font-bold">
                SHIPPING INFO
              </legend>
              <div className="mb-6 flex w-full flex-col gap-[9px]">
                <label
                  htmlFor="address"
                  className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                    errors.address ? "text-wrong-red" : ""
                  }`}
                >
                  <span>Your Address</span>
                  {errors.address && (
                    <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                      {errors.address}
                    </span>
                  )}
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  placeholder="1137 Williams Avenue"
                  aria-invalid={!!errors.address}
                  className={`placeholder-black-40 rounded-lg border ${
                    errors.address
                      ? "border-wrong-red outline-wrong-red outline outline-2"
                      : "border-[#CFCFCF]"
                  } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                />
              </div>
              <div className="md:flex md:gap-4">
                <div className="mb-6 flex w-full flex-col gap-[9px]">
                  <label
                    htmlFor="zip"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.zip ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>ZIP Code</span>
                    {errors.zip && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.zip}
                      </span>
                    )}
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="postal-code"
                    required
                    placeholder="10001"
                    aria-invalid={!!errors.zip}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.zip
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
                <div className="mb-6 flex w-full flex-col gap-[9px]">
                  <label
                    htmlFor="city"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.city ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>City</span>
                    {errors.city && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.city}
                      </span>
                    )}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    placeholder="New York"
                    aria-invalid={!!errors.city}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.city
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
              </div>
              <div className="md:flex">
                <div className="flex flex-col gap-[9px] md:w-1/2 md:pr-2">
                  <label
                    htmlFor="country"
                    className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                      errors.country ? "text-wrong-red" : ""
                    }`}
                  >
                    <span>Country</span>
                    {errors.country && (
                      <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                        {errors.country}
                      </span>
                    )}
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    required
                    placeholder="United States"
                    aria-invalid={!!errors.country}
                    className={`placeholder-black-40 rounded-lg border ${
                      errors.country
                        ? "border-wrong-red outline-wrong-red outline outline-2"
                        : "border-[#CFCFCF]"
                    } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="tracking-0-93 text-orange mb-4 text-xs leading-25 font-bold">
                PAYMENT DETAILS
              </legend>
              <div className="flex flex-col gap-[17px] lg:flex-row lg:gap-4">
                <p className="text-xxs tracking--0-21 leading-16 font-bold lg:w-1/2">
                  Payment Method
                </p>
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:gap-4 lg:w-1/2 lg:flex-col">
                  <label
                    htmlFor="payment-e-money"
                    className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-[#CFCFCF] px-4 py-[18px] text-sm leading-19 font-bold"
                  >
                    <input
                      id="payment-e-money"
                      type="radio"
                      name="payment-method"
                      value="e-money"
                      checked={paymentMethod === "e-money"}
                      onChange={() => setPaymentMethod("e-money")}
                      className="h-5 w-5 accent-[#D87D4A] focus-visible:ring-2 focus-visible:ring-[#D87D4A] focus-visible:ring-offset-2 focus-visible:outline-none"
                    />
                    <span>e-Money</span>
                  </label>
                  <label
                    htmlFor="payment-cod"
                    className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-[#CFCFCF] px-4 py-[18px] text-sm leading-19 font-bold"
                  >
                    <input
                      id="payment-cod"
                      type="radio"
                      name="payment-method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="h-5 w-5 accent-[#D87D4A] focus-visible:ring-2 focus-visible:ring-[#D87D4A] focus-visible:ring-offset-2 focus-visible:outline-none"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
              {paymentMethod === "e-money" && (
                <div className="md:flex md:gap-4">
                  <div className="mb-6 flex w-full flex-col gap-[9px] md:mb-0">
                    <label
                      htmlFor="e-money-number"
                      className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                        errors.eMoneyNumber ? "text-wrong-red" : ""
                      }`}
                    >
                      <span>e-Money Number</span>
                      {errors.eMoneyNumber && (
                        <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                          {errors.eMoneyNumber}
                        </span>
                      )}
                    </label>
                    <input
                      id="e-money-number"
                      name="e-money-number"
                      type="number"
                      autoComplete="e-money-number"
                      required={paymentMethod === "e-money"}
                      placeholder="238521993"
                      aria-invalid={!!errors.eMoneyNumber}
                      className={`placeholder-black-40 rounded-lg border ${
                        errors.eMoneyNumber
                          ? "border-wrong-red outline-wrong-red outline outline-2"
                          : "border-[#CFCFCF]"
                      } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[9px]">
                    <label
                      htmlFor="e-money-pin"
                      className={`text-xxs tracking--0-21 flex justify-between leading-16 font-bold ${
                        errors.eMoneyPin ? "text-wrong-red" : ""
                      }`}
                    >
                      <span>e-Money PIN</span>
                      {errors.eMoneyPin && (
                        <span className="text-wrong-red text-xxs tracking--0-21 leading-16 font-medium">
                          {errors.eMoneyPin}
                        </span>
                      )}
                    </label>
                    <input
                      id="e-money-pin"
                      name="e-money-pin"
                      type="number"
                      autoComplete="e-money-pin"
                      required={paymentMethod === "e-money"}
                      placeholder="6891"
                      aria-invalid={!!errors.eMoneyPin}
                      className={`placeholder-black-40 rounded-lg border ${
                        errors.eMoneyPin
                          ? "border-wrong-red outline-wrong-red outline outline-2"
                          : "border-[#CFCFCF]"
                      } py-[18px] pl-6 text-sm leading-19 font-bold text-black caret-[#D87D4A] placeholder:text-sm placeholder:leading-19`}
                    />
                  </div>
                </div>
              )}
              {paymentMethod === "cod" && (
                <div className="flex justify-between gap-8">
                  <Image
                    src={IconCashOnDelivery}
                    alt=""
                    className="h-12 w-12 self-center"
                  />
                  <p className="text-md text-black-50 leading-25 font-medium">
                    The &apos;Cash on Delivery&apos; option enables you to pay
                    in cash when our delivery courier arrives at your residence.
                    Just make sure your address is correct so that your order
                    will not be cancelled.
                  </p>
                </div>
              )}
            </fieldset>
          </form>
        </div>
        <CheckoutSummary />
      </section>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CompletOrderModal />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
