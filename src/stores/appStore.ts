import { create } from "zustand";

export type ChainType =
  | "Unknown"
  | "Mainnet"
  | "Base"
  | "Arbitrum"
  | "Optimism"
  | "Polygon"
  | "Bsc";

export enum Step {
  SelectChain,
  SelectAddress,
  LiveView,
}

type State = {
  step: Step;
  chain: ChainType;
  addresses: string[];
};
type Actions = {
  setStep: (step: Step) => void;
  setChain: (chain: ChainType) => void;

  setAddresses: (addresses: string[]) => void;
  addAddress: (address: string) => void;
  removeAddress: (address: string) => void;
};

export const useAppStore = create<State & Actions>()((set) => ({
  step: Step.SelectChain,
  chain: "Unknown",
  addresses: [],

  //
  setStep: (step: Step) => {
    set({ step });
  },
  setChain: (chain: ChainType) => {
    set({ chain });
  },
  setAddresses: (addresses: string[]) => {
    set({ addresses });
  },
  addAddress: (address: string) => {
    set((state) => ({
      addresses: [...state.addresses, address],
    }));
  },
  removeAddress: (address: string) => {
    set((state) => ({
      addresses: state.addresses.filter((x) => x !== address),
    }));
  },
}));
