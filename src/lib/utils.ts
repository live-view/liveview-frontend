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
      return "/nft.svg";
    }
  }
  return "/nft.svg";
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

export const beautifyEthereumAddress = (
  address: string,
  startLength = 4,
  endLength = 4,
) => {
  if (!address || typeof address !== "string") {
    throw new Error("Invalid Ethereum address");
  }
  // Ensure the address starts with '0x'
  if (!address.startsWith("0x")) {
    throw new Error("Ethereum address must start with '0x'");
  }
  // Ensure the address is the correct length (42 characters)
  if (address.length !== 42) {
    throw new Error("Ethereum address must be 42 characters long");
  }
  // Extract the beginning and end of the address
  const start = address.substring(0, startLength + 2); // Include '0x'
  const end = address.substring(address.length - endLength);
  return `${start}...${end}`;
};
