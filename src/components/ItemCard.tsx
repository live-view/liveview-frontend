"use client";

import { beautifyEthereumAddress } from "@/lib/utils";
import type { Item } from "@/stores/appStore";
import { motion } from "motion/react";
import FallbackImage from "./FallbackImage";
import _ from "lodash";

type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  const top = `${_.random(20, 70)}%`;

  return (
    <>
      <motion.div
        className={`absolute w-20 rounded border border-gray-600 bg-gray-800 p-2 px-4 py-2 text-center text-[8px] font-light text-gray-400 shadow hover:opacity-90`}
        initial={{ top, left: "5%", opacity: 0.75 }}
        animate={{
          opacity: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 2, // Total animation duration
          ease: "easeInOut", // Smooth ease
        }}
      >
        {beautifyEthereumAddress(item.from)}
      </motion.div>
      <motion.div
        className="absolute w-20 rounded border border-gray-600 bg-gray-800 p-2 px-4 py-2 text-center text-[8px] font-light text-gray-400 shadow hover:opacity-90"
        initial={{ top, left: "85%", opacity: 0.75 }}
        animate={{
          // left: ["5%", "90%"],
          opacity: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 2, // Total animation duration
          ease: "easeInOut", // Smooth ease
        }}
      >
        {beautifyEthereumAddress(item.to)}
      </motion.div>
      <motion.div
        className="absolute flex h-28 w-24 flex-col items-center justify-between rounded border border-primary bg-gray-700 p-1 shadow"
        initial={{ left: "10%", top, opacity: 0.75, scale: 0 }} // Relative to parent
        animate={{
          left: ["10%", "90%"],
          opacity: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          scale: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2, // Total animation duration
          ease: "easeInOut", // Smooth ease
        }}
      >
        <FallbackImage
          src={item.image}
          alt={item.name}
          fallbackSrc="/nft.svg"
          width={76}
          height={76}
          className="size-[76px] min-h-[76px] min-w-[76px] rounded bg-cover bg-center pb-1"
        />
        <div>
          <span className="line-clamp-1 text-[8px] font-light">
            {item.symbol} #{BigInt(item.token_id).toString()}
          </span>
          <span className="line-clamp-1 text-[8px] font-extralight">
            {item.name}
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default ItemCard;
