"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => total +Number(item.price), 0);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Order placed successfully!");
      removeAll();
    }

    if (searchParams.get("canceled") === "true") {
      toast.error("Something went wrong.");
    }
  },[searchParams,removeAll])

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds : items.map(item => item.id),
    })

    window.location = response.data.url;
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <div className="text-base font-medium text-gray-900">
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>
      <Button onClick={onCheckout} className="mt-6 w-full">Checkout</Button>
    </div>
  );
};

export default Summary;
