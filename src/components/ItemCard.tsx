import Image from "next/image";

import { getImageUrl } from "@/lib/utils";
import type { Item } from "@/stores/appStore";

type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  return (
    <div>
      {item.transaction_hash}
      <Image src={getImageUrl(item)} width={200} height={200} alt={item.uuid} />
    </div>
  );
};

export default ItemCard;
