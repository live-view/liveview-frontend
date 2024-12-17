"use client";

import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { useAppStore } from "@/stores/appStore";
import { socket } from "@/utils/socket";
import { getImageUrl } from "@/lib/utils";
import ListItem from "./ListItem";

import ItemCard from "./ItemCard";

const LiveView = () => {
  const [isConnected, setIsConnected] = useState(false);

  const chain = useAppStore((state) => state.chain);
  const tokens = useAppStore((state) => state.tokens);
  const items = useAppStore((state) => state.items);

  const addItem = useAppStore((state) => state.addItem);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.emit("request", {
      chain: chain,
      addresses: _.map(tokens, (x) => x.address),
    });

    socket.on("response", (data) => {
      const image = getImageUrl(data);
      addItem({
        ...data,
        image,
        uuid: uuidv4(),
      });
    });
  }, []);

  return (
    <div className="grid h-[630px] min-h-screen w-full grid-cols-12">
      {isConnected && (
        <>
          <div className="relative col-span-12 h-[400px] w-full bg-custom-bg bg-cover bg-center bg-no-repeat md:col-span-9 md:h-full">
            {_.map(items, (x) => (
              <ItemCard key={x.uuid} item={x} />
            ))}
          </div>
          <ul className="col-span-12 flex min-h-screen flex-col items-center justify-start overflow-y-scroll border border-gray-700 pr-1 shadow-md md:col-span-3">
            {_.map(items, (x) => (
              <ListItem key={x.uuid} item={x} />
            ))}
          </ul>
        </>
      )}
      <div className="col-span-12 flex w-full items-center justify-center bg-gray-800 py-4">
        <button
          className="rounded bg-primary px-4 py-2 text-sm font-light text-gray-200 hover:opacity-90"
          onClick={() => {
            window.document.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default LiveView;
