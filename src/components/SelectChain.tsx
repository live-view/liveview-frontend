"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { useAppStore, type ChainType } from "@/stores/appStore";

import Title from "./Title";

type ChainItem = {
  name: ChainType;
  logo: string;
};

const chains: ChainItem[] = [
  {
    name: "Mainnet",
    logo: "/images/ethereum.png",
  },
  {
    name: "Base",
    logo: "/images/base.png",
  },
  {
    name: "Arbitrum",
    logo: "/images/arbitrum.png",
  },
  {
    name: "Optimism",
    logo: "/images/optimism.png",
  },
  {
    name: "Polygon",
    logo: "/images/polygon.png",
  },
  {
    name: "Bsc",
    logo: "/images/bsc.png",
  },
];

const SelectChain = () => {
  const setChain = useAppStore((state) => state.setChain);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-16"
    >
      <Title title="Select your preferred chain" />
      <ul className="my-12 grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3">
        {chains.map((chain) => (
          <li key={chain.name} className="size-32">
            <button
              className="h-full w-full rounded-xl border border-gray-700 p-5 shadow transition-all hover:border-primary hover:bg-gray-700 hover:p-4"
              onClick={() => setChain(chain.name)}
            >
              <Image
                src={chain.logo}
                alt={chain.name}
                width={200}
                height={200}
                priority
                fetchPriority="high"
              />
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SelectChain;
