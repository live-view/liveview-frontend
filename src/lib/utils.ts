import type { ChainType, Item } from "@/stores/appStore";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getImageUrl = (item: Item) => {
  if (item.image_type === "Url") {
    if (item.image.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${item.image.slice(7)}`;
    }
    return item.image;
  }
  if (item.image_type === "Data") {
    const image = item.image.replace("data:application/json;base64,", "");
    try {
      return JSON.parse(atob(image)).image;
    } catch (e) {
      console.error(e);
      return "https://etherscan.io/images/main/nft-placeholder.svg";
    }
  }
  return "https://etherscan.io/images/main/nft-placeholder.svg";
};

export const getScanUrl = (chain: ChainType) => {
  if (chain === "Mainnet") return `https://etherscan.io`;
  if (chain === "Base") return `https://basescan.org`;
  if (chain === "Arbitrum") return `https://arbiscan.io`;
  if (chain === "Optimism") return `https://optimistic.etherscan.io`;
  if (chain === "Polygon") return `https://polygonscan.com`;
  if (chain === "Bsc") return `https://bscscan.com`;
  return `https://etherscan.io`;
};
