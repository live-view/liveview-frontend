"use client";

import { useEffect, useState } from "react";

import { socket } from "@/utils/socket";

const Page = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  // const [chain, setChain] = useState<"Mainnet" | "Base">("Mainnet");
  // const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("response", (data) => {
      console.log("response:", data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("request", {
      chain: "Mainnet",
      addresses: ["0x1", "0x2", "0x3"],
    });
  };

  return (
    <section>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => (!isConnected ? socket.connect() : socket.disconnect())}
      >
        {!isConnected ? "Connect" : "Disconnect"}
      </button>

      <form noValidate className="mt-4" onSubmit={onSubmit}>
        <button
          type="submit"
          disabled={!isConnected}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Page;
