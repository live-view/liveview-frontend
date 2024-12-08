"use client";

import { Step, useAppStore } from "@/stores/appStore";

const LiveView = () => {
  const chain = useAppStore((state) => state.chain);
  const addresses = useAppStore((state) => state.addresses);

  const setStep = useAppStore((state) => state.setStep);
  const setChain = useAppStore((state) => state.setChain);
  const setAddresses = useAppStore((state) => state.setAddresses);

  return (
    <div>
      LiveView
      <br />
      <div>
        Chain: {chain}
        <br />
        Addresses: {addresses.join(", ")}
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={() => {
          setChain("Unknown");
          setAddresses([]);
          setStep(Step.SelectChain);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default LiveView;
