"use client";

import { Step, useAppStore, type ChainType } from "@/stores/appStore";

const SelectChain = () => {
  const setStep = useAppStore((state) => state.setStep);
  const chain = useAppStore((state) => state.chain);
  const setChain = useAppStore((state) => state.setChain);

  return (
    <div>
      SelectChain
      <br />
      <select
        name="chain"
        id="chain"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onChange={(e) => setChain(e.target.value as ChainType)}
      >
        <option>Select Chain</option>
        <option value="Mainnet">Mainnet</option>
        <option value="Base">Base</option>
        <option value="Arbitrum">Arbitrum</option>
        <option value="Optimism">Optimism</option>
        <option value="Polygon">Polygon</option>
        <option value="Bsc">Bsc</option>
      </select>
      <br />
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={() => setStep(Step.SelectAddress)}
        disabled={chain === "Unknown"}
      >
        Next
      </button>
    </div>
  );
};

export default SelectChain;
