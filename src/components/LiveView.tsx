"use client";

import { motion, AnimatePresence } from "motion/react";

import { Step, useAppStore } from "@/stores/appStore";

const LiveView = () => {
  const chain = useAppStore((state) => state.chain);
  const addresses = useAppStore((state) => state.addresses);

  const setStep = useAppStore((state) => state.setStep);
  const setChain = useAppStore((state) => state.setChain);
  const setAddresses = useAppStore((state) => state.setAddresses);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveView;
