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
  SelectToken,
  LiveView,
}

export type Token = {
  name: string;
  symbol: string;
  address: string;
};
type Status = "idle" | "loading" | "success" | "error";

export type Item = {
  id: string;
  uuid: string;
  address: string;
  name: string;
  symbol: string;
  from: string;
  to: string;
  image: string;
  image_type: string;
  block_number: number;
  token_id: string;
  transaction_hash: string;
  timestamp: string;
};

type State = {
  step: Step;
  chain: ChainType;
  tokens: Token[];
  status: Status;
  errorMessage: string;
  items: Item[];
};

type Actions = {
  setStep: (step: Step) => void;
  setChain: (chain: ChainType) => void;

  addToken: (token: Token) => void;
  removeToken: (address: string) => void;
  removeTokens: () => void;
  reset: () => void;
  setStatus: (status: Status) => void;
  setErrorMessage: (errorMessage: string) => void;
  addItem: (item: Item) => void;
};

export const useAppStore = create<State & Actions>()((set) => ({
  step: Step.SelectChain,
  chain: "Unknown",
  tokens: [],
  status: "idle",
  errorMessage: "",
  items: [],

  //
  setStep: (step: Step) => {
    set({ step });
  },
  setChain: (chain: ChainType) => {
    set((state) => ({ ...state, chain, step: Step.SelectToken }));
  },
  addToken: (token: Token) => {
    set((state) => {
      return { ...state, tokens: [...state.tokens, token] };
    });
  },
  removeToken: (address: string) => {
    set((state) => ({
      ...state,
      tokens: state.tokens.filter((x) => x.address !== address),
    }));
  },
  removeTokens: () => {
    set((state) => ({ ...state, tokens: [] }));
  },
  setStatus: (status: Status) => {
    set((state) => ({ ...state, status }));
  },
  setErrorMessage: (errorMessage: string) => {
    set((state) => ({ ...state, errorMessage }));
  },
  addItem: (item: Item) => {
    set((state) => {
      const items =
        state.items.length >= 20
          ? [item, ...state.items.slice(0, -1)] // Remove the first element and add the new item
          : [item, ...state.items]; // Add the new item

      return { ...state, items };
    });
  },
  reset: () => {
    set({
      step: Step.SelectChain,
      chain: "Unknown",
      tokens: [],
      status: "idle",
      errorMessage: "",
      items: [],
    });
  },
}));
