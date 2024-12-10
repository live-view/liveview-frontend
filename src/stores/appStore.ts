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
type StatusType = "idle" | "loading" | "success" | "error";

type State = {
  step: Step;
  chain: ChainType;
  tokens: Token[];
  status: StatusType;
  errorMessage: string;
};

type Actions = {
  setStep: (step: Step) => void;
  setChain: (chain: ChainType) => void;

  addToken: (token: Token) => void;
  removeToken: (address: string) => void;
  removeTokens: () => void;
  reset: () => void;
  setStatus: (status: StatusType) => void;
  setErrorMessage: (errorMessage: string) => void;
};

export const useAppStore = create<State & Actions>()((set) => ({
  step: Step.SelectChain,
  chain: "Unknown",
  tokens: [],
  status: "idle",
  errorMessage: "",

  //
  setStep: (step: Step) => {
    set({ step });
  },
  setChain: (chain: ChainType) => {
    set((state) => ({ ...state, chain, step: Step.SelectToken }));
  },
  addToken: (token: Token) => {
    set((state) => ({
      ...state,
      tokens: [...state.tokens, token],
    }));
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
  setStatus: (status: StatusType) => {
    set((state) => ({ ...state, status }));
  },
  setErrorMessage: (errorMessage: string) => {
    set((state) => ({ ...state, errorMessage }));
  },
  reset: () => {
    set({
      step: Step.SelectChain,
      chain: "Unknown",
      tokens: [],
      status: "idle",
      errorMessage: "",
    });
  },
}));
