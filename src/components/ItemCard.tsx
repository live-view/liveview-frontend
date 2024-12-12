import { jwtDecode } from "jwt-decode";

import type { Item } from "@/stores/appStore";
import Image from "next/image";

type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  const getImageUrl = () => {
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
        return "https://etherscan.io/images/main/nft-placeholder.svg";
      }
    }
    return "https://etherscan.io/images/main/nft-placeholder.svg";
  };

  return (
    <div>
      {item.transaction_hash}
      <Image src={getImageUrl()} width={200} height={200} alt={item.uuid} />
    </div>
  );
};

export default ItemCard;
