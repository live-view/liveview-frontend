"use client";

import { motion, AnimatePresence } from "motion/react";

import { Step, useAppStore } from "@/stores/appStore";

const LiveView = () => {
  const chain = useAppStore((state) => state.chain);
  const tokens = useAppStore((state) => state.tokens);

  // const setStep = useAppStore((state) => state.setStep);
  // const setChain = useAppStore((state) => state.setChain);
  const reset = useAppStore((state) => state.reset);

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
          {/* Addresses: {tokens.join(", ")} */}
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveView;
