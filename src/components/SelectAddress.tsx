"use client";

import { useState } from "react";

import { Step, useAppStore } from "@/stores/appStore";

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
    <div>
      SelectAddress
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
      <form noValidate className="mt-4" onSubmit={handleAddAddress}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          className="mt-2"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="mx-4 my-2 bg-teal-500" type="submit">
          Add
        </button>
      </form>
      <button
        className="mx-4 my-2 bg-teal-500"
        onClick={() => setStep(Step.SelectChain)}
      >
        Previous
      </button>
      <button
        className="mx-4 my-2 bg-teal-500"
        onClick={() => setStep(Step.LiveView)}
        disabled={addresses.length === 0}
      >
        Next
      </button>
    </div>
  );
};

export default SelectAddress;
