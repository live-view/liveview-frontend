"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoSearch as SearchIcon } from "react-icons/io5";
import Image from "next/image";
import * as _ from "lodash";
import {
  MdOutlineReportGmailerrorred as ErrorIcon,
  MdDeleteOutline as DeleteIcon,
} from "react-icons/md";
import { toast } from "react-toastify";

import { Step, Token, useAppStore } from "@/stores/appStore";
import Title from "./Title";

const SelectToken = () => {
  const [address, setAddress] = useState("");
  const [debouncedAddress, setDebouncedAddress] = useState("");
  const [token, setToken] = useState<Token>({
    address: "",
    name: "",
    symbol: "",
  });
  // const [debouncedToken, setDebouncedToken] = useState<Token>({
  //   address: "",
  //   name: "",
  //   symbol: "",
  // });

  const notify = () =>
    toast.error("Address already exists", {
      autoClose: 1_000,
      icon: <ErrorIcon className="text-orange-500" />,
    });

  // const inputRef = useRef<HTMLInputElement>(null);

  const chain = useAppStore((state) => state.chain);
  const tokens = useAppStore((state) => state.tokens);
  const status = useAppStore((state) => state.status);
  const errorMessage = useAppStore((state) => state.errorMessage);
  const setStep = useAppStore((state) => state.setStep);
  const addToken = useAppStore((state) => state.addToken);
  const removeToken = useAppStore((state) => state.removeToken);
  const removeTokens = useAppStore((state) => state.removeTokens);
  const setStatus = useAppStore((state) => state.setStatus);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const handleAddressChange = async () => {
    if (!address) {
      setToken({
        address: "",
        name: "",
        symbol: "",
      });
      setStatus("idle");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL!}/search?chain=${chain}&address=${address}`;

    //
    try {
      setStatus("loading");
      const res = await fetch(url);
      const data = await res.json();
      setStatus("success");
      setToken({
        address,
        name: data.name,
        symbol: data.symbol,
      });
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMessage("Sorry we couldn't find any NFTs for this address");
    }
  };

  const handleTokenChange = () => {
    if (!token.address) {
      return;
    }

    // Check if address already in state
    if (_.some(tokens, (x) => x.address === token.address)) {
      notify();
      return;
    }

    setStatus("idle");
    addToken(token);
    setToken({
      address: "",
      name: "",
      symbol: "",
    });

    setAddress("");
  };

  const getImageUrl = () => {
    if (chain === "Mainnet") return "/images/ethereum.png";
    if (chain === "Base") return "/images/base.png";
    if (chain === "Arbitrum") return "/images/arbitrum.png";
    if (chain === "Optimism") return "/images/optimism.png";
    if (chain === "Polygon") return "/images/polygon.png";
    if (chain === "Bsc") return "/images/bsc.png";
    return "/images/ethereum.png";
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedAddress(address);
    }, 250);

    return () => clearTimeout(timeout);
  }, [address]);

  useEffect(() => {
    if (debouncedAddress) {
      handleAddressChange();
    }
  }, [debouncedAddress]);

  useEffect(() => {
    if (!address) {
      setStatus("idle");
    }
  }, [address]);

  useEffect(() => {
    return () => {
      setStatus("idle");
      setErrorMessage("");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4"
    >
      <Title title="Enter NFT addresses to track" />
      {tokens.length > 0 && (
        <div>
          <br />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {tokens.map((token) => (
              <li
                key={token.address}
                className="flex w-40 items-center justify-between rounded border border-gray-700 pl-2 sm:w-44"
              >
                <span className="line-clamp-1 text-[10px] font-light">
                  {token.name} ({token.symbol})
                </span>
                <button
                  className="p-2 transition-all hover:bg-gray-700"
                  onClick={() => removeToken(token.address)}
                >
                  <DeleteIcon className="text-white" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <br />
      <div className="relative my-4">
        {status === "loading" ? (
          <div className="absolute left-4 top-3 text-gray-400">
            <svg
              aria-hidden="true"
              className="inline h-4 w-4 animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="absolute left-4 top-4 text-gray-400">
            <SearchIcon size="20px" />
          </div>
        )}
        <input
          className="w-full rounded border border-gray-600 bg-gray-700 py-3 pl-12 shadow outline-none transition-all hover:border-primary focus:border-primary"
          type="text"
          name="address"
          id="address"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {status === "success" && (
        <button
          onClick={handleTokenChange}
          className="hover:gray-700 mb-4 flex w-full items-center rounded border border-gray-700 transition-all hover:border-primary hover:bg-gray-700"
        >
          <Image
            src={getImageUrl()}
            alt={token.name}
            width={200}
            height={200}
            className="m-4 size-12"
          />
          {token.name} ({token.symbol})
        </button>
      )}
      {status === "error" && (
        <button className="hover:gray-700 mb-4 flex w-full items-center rounded border border-gray-700 transition-all hover:border-orange-600 hover:bg-gray-700">
          <ErrorIcon className="m-4 size-12 text-orange-500" />
          {errorMessage}
        </button>
      )}

      <div className="flex w-full items-center justify-between">
        <button
          className="rounded bg-primary px-4 py-2 text-sm font-light text-gray-200 hover:opacity-90"
          onClick={() => {
            removeTokens();
            setStep(Step.SelectChain);
          }}
        >
          Previous
        </button>
        <button
          className="rounded bg-primary px-4 py-2 text-sm font-light text-gray-200 hover:opacity-90"
          onClick={() => setStep(Step.LiveView)}
          disabled={tokens.length === 0}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default SelectToken;
