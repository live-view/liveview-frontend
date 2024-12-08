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
        className="mx-4 my-2 bg-teal-500"
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
