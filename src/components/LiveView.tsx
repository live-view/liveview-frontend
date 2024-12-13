"use client";

import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStore } from "@/stores/appStore";
import { socket } from "@/utils/socket";
import { getImageUrl, getScanUrl } from "@/lib/utils";
import ListItem from "./ListItem";

const LiveView = () => {
  const [isConnected, setIsConnected] = useState(false);

  const chain = useAppStore((state) => state.chain);
  const tokens = useAppStore((state) => state.tokens);
  const items = useAppStore((state) => state.items);

  const addItem = useAppStore((state) => state.addItem);
  // const reset = useAppStore((state) => state.reset);

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
    <div className="grid h-[650px] w-full grid-cols-12">
      {isConnected && (
        <>
          <Image
            className="col-span-9 w-full"
            src="/map.svg"
            alt="world map"
            width={1056}
            height={495}
          />
          <ul className="col-span-12 grid grid-rows-10 items-start gap-[2px] rounded-lg border-2 border-gray-700 py-2 shadow-md md:col-span-3">
            {/* <AnimatePresence> */}
            {_.map(items, (x) => (
              <ListItem key={x.uuid} item={x} />
            ))}
            {/* </AnimatePresence> */}
          </ul>
        </>
        // <WorldMap
        //   dots={[
        //     {
        //       start: {
        //         lat: 64.2008,
        //         lng: -149.4937,
        //       }, // Alaska (Fairbanks)
        //       end: {
        //         lat: 34.0522,
        //         lng: -118.2437,
        //       }, // Los Angeles
        //     },
        //     {
        //       start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
        //       end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
        //     },
        //     {
        //       start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
        //       end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
        //     },
        //     {
        //       start: { lat: 51.5074, lng: -0.1278 }, // London
        //       end: { lat: 28.6139, lng: 77.209 }, // New Delhi
        //     },
        //     {
        //       start: { lat: 28.6139, lng: 77.209 }, // New Delhi
        //       end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
        //     },
        //     {
        //       start: { lat: 28.6139, lng: 77.209 }, // New Delhi
        //       end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
        //     },
        //   ]}
        // />
      )}
      {/* Item lists */}
    </div>
  );
};

export default LiveView;

// {/* <div className="h-72 scroll-m-10">
//   {_.map(items, (x) => (
//     // <div key={x.uuid}>{x.transaction_hash}</div>
//     <ItemCard key={x.uuid} item={x} />
//   ))}
// </div> */}

// {/* <button
// className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
// onClick={() => {
//   reset();
// }}
// >
// Reset
// </button> */}
