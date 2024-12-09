"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { IoSearch as SearchIcon } from "react-icons/io5";

import { Step, useAppStore } from "@/stores/appStore";
import Title from "./Title";

const SelectAddress = () => {
  const [address, setAddress] = useState("");

  const addresses = useAppStore((state) => state.addresses);
  const setStep = useAppStore((state) => state.setStep);
  const addAddress = useAppStore((state) => state.addAddress);
  const removeAddress = useAppStore((state) => state.removeAddress);

  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) return;

    // Check if address already in state
    if (addresses.includes(address)) {
      alert("Address already exists");
      return;
    }

    addAddress(address);
    setAddress("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Title title="Select addresses to track" />
      {addresses.length > 0 && (
        <div>
          <br />
          <ul>
            {addresses.map((address) => (
              <li key={address}>
                <span>{address}</span>
                <button
                  className="mx-4 my-2 bg-teal-500"
                  onClick={() => removeAddress(address)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <br />
      <form noValidate className="relative mt-4" onSubmit={handleAddAddress}>
        <div>
          <div className="absolute left-4 top-4 text-gray-400">
            <SearchIcon size="20px" />
          </div>
          <input
            className="w-full rounded-2xl border border-gray-600 bg-gray-700 py-3 pl-12 shadow outline-none transition-all hover:border-primary focus:border-primary"
            type="text"
            name="address"
            id="address"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
          type="submit"
        >
          Add
        </button>
      </form>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={() => setStep(Step.SelectChain)}
      >
        Previous
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={() => setStep(Step.LiveView)}
        disabled={addresses.length === 0}
      >
        Next
      </button>
    </motion.div>
  );
};

export default SelectAddress;
