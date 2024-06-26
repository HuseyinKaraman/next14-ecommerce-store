"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";

import { Product } from "@/types";

interface CartItemProps {
  data: Product
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();
  
  
  const onRemove = () => {
    cart.removeItem(data.id);
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative w-24 h-24 rounded-md overflow-hidden sm:w-48 sm:h-48">
        <Image 
          src={data.images?.[0]?.url}
          fill
          alt="image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 felx flex-1 felx-col justify-between sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton icon={<X size={15} />} onClick={onRemove} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data?.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data?.color?.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data?.size?.name}</p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  )
}

export default CartItem