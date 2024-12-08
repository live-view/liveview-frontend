"use client";

import { useEffect, useState } from "react";

import { socket } from "@/utils/socket";

import { Step, useAppStore } from "@/stores/appStore";
import SelectChain from "@/components/SelectChain";
import SelectAddress from "@/components/SelectAddress";
import LiveView from "@/components/LiveView";

const Page = () => {
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");

  const step = useAppStore((state) => state.step);
  const setStep = useAppStore((state) => state.setStep);
  // const chainStore = useAppStore((state) => state.chain);
  // const addressesStore = useAppStore((state) => state.addresses);

  // useEffect(() => {
  //   const onConnect = () => {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport) => {
  //       setTransport(transport.name);
  //     });
  //   };

  //   const onDisconnect = () => {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   };

  //   if (socket.connected) {
  //     onConnect();
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   socket.on("response", (data) => {
  //     console.log("response:", data);
  //   });

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   socket.emit("request", {
  //     chain: chainStore,
  //     addresses: addressesStore,
  //   });
  // };

  return (
    <section>
      {step === Step.SelectChain && <SelectChain />}
      {step === Step.SelectAddress && <SelectAddress />}
      {step === Step.LiveView && <LiveView />}
      {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => (!isConnected ? socket.connect() : socket.disconnect())}
      >
        {!isConnected ? "Connect" : "Disconnect"}
      </button> */}

      {/* <form noValidate className="mt-4" onSubmit={onSubmit}>
        <select
          name="chain"
          id="chain"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        >
          <option>Select Chain</option>
          <option value="Mainnet">Mainnet</option>
          <option value="Base">Base</option>
          <option value="Arbitrum">Arbitrum</option>
          <option value="Optimism">Optimism</option>
          <option value="Polygon">Polygon</option>
          <option value="Bsc">Bsc</option>
        </select>
        <input type="text" name="address" id="address" className="mt-2" />
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
          disabled={!isConnected}
        >
          {isConnected ? "Send" : "Connect first"}
        </button>
      </form> */}
    </section>
  );
};

export default Page;
