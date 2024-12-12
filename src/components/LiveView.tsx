"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppStore, type Item } from "@/stores/appStore";
import { socket } from "@/utils/socket";
import _ from "lodash";
import ItemCard from "./ItemCard";

const LiveView = () => {
  const [isConnected, setIsConnected] = useState(false);

  const chain = useAppStore((state) => state.chain);
  const tokens = useAppStore((state) => state.tokens);
  const items = useAppStore((state) => state.items);

  const addItem = useAppStore((state) => state.addItem);
  const reset = useAppStore((state) => state.reset);

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
      addItem({
        ...data,
        uuid: uuidv4(),
      });
    });
  }, []);

  return (
    <div>
      {isConnected && (
        <>
          <div>
            Chain: {chain}
            <br />
            <div className="h-72 scroll-m-10">
              {_.map(items, (x) => (
                // <div key={x.uuid}>{x.transaction_hash}</div>
                <ItemCard key={x.uuid} item={x} />
              ))}
            </div>
          </div>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default LiveView;
