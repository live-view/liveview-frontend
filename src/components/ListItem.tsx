"use client";

import { motion } from "motion/react";

import { beautifyEthereumAddress, getScanUrl } from "@/lib/utils";
import { useAppStore, type Item } from "@/stores/appStore";
import FallbackImage from "./FallbackImage";

type Props = {
  item: Item;
};

const ListItem = ({ item: x }: Props) => {
  const chain = useAppStore((state) => state.chain);
  return (
    <motion.li
      key={x.uuid}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 0 }}
      transition={{
        type: "tween", // Switch to a tween animation (no spring)
        duration: 0.25, // Duration of the animation in seconds
        ease: "easeInOut", // Smoother easing
      }}
      layout
      className="mb-[2px] w-full"
    >
      <a
        href={`${getScanUrl(chain)}/tx/${x.transaction_hash}`}
        className="flex h-16 items-center justify-start rounded border-y border-r border-gray-600 text-gray-200 transition-all hover:border-primary hover:bg-gray-700"
        target="_blank"
      >
        <FallbackImage
          src={x.image}
          alt={x.name}
          fallbackSrc="/nft.svg"
          width={64}
          height={64}
          className="size-16 min-h-16 min-w-16 rounded bg-cover bg-center"
        />
        <div className="flex h-full w-full flex-col items-start justify-between px-2 py-2">
          <p className="">
            <span className="line-clamp-1 text-[8px] font-semibold">
              {x.symbol} #{BigInt(x.token_id).toString()}
            </span>
            <span className="line-clamp-1 text-[8px] font-extralight">
              {x.name}
            </span>
          </p>
          <p className="text-[8px] font-extralight">
            {" "}
            {beautifyEthereumAddress(x.from)} {"-->"}{" "}
            {beautifyEthereumAddress(x.to)}
          </p>
        </div>
      </a>
    </motion.li>
  );
};

export default ListItem;
