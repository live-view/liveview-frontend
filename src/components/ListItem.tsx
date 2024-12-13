"use client";

import { getScanUrl } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

import { useAppStore, type Item } from "@/stores/appStore";

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
    >
      <a
        href={`${getScanUrl(chain)}/tx/${x.transaction_hash}`}
        className="row-span-1 flex h-12 items-center justify-between gap-2 rounded border-b border-r border-t border-gray-600 text-[10px] font-light text-gray-200 transition-all hover:bg-gray-700"
        target="_blank"
      >
        <Image
          src={x.image}
          alt={x.name}
          width={48}
          height={48}
          className="size-12 rounded-bl rounded-tl border-b border-l border-t border-gray-600"
        />
        <div>
          <span className="line-clamp-1">
            {x.symbol} ({x.name})
          </span>
          <br />
          <span className="line-clamp-1">{x.uuid}</span>
        </div>
      </a>
    </motion.li>
  );
};

export default ListItem;
