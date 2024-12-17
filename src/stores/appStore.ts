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
  // step: Step.SelectChain,
  // chain: "Unknown",
  // tokens: [],
  step: Step.LiveView,
  // Arbitrum (for testing)
  chain: "Arbitrum",
  tokens: [
    {
      name: "",
      symbol: "",
      address: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
    },
    {
      name: "",
      symbol: "",
      address: "0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7",
    },
  ],
  // Base (for testing)
  // chain: "Base",
  // tokens: [
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x62c9c4bcf784ad09b34f366a769ce4a00a4d0255",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x38ba98ada81a7671b683a7675a14a5b01c674ff4",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x827922686190790b37229fd06084350e74485b72",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x03a520b32c04bf3beef7beb72e919cf822ed34f1",
  //   },
  // ],
  // Mainnet (for testing)
  // chain: "Mainnet",
  // tokens: [
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x524cab2ec69124574082676e6f654a18df49a048",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
  //   },

  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x062e691c2054de82f28008a8ccc6d7a1c8ce060d",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xd774557b647330c91bf44cfeab205095f7e6c367",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xb6a37b5d14d502c3ab0ae6f3a0e058bc9517786e",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x769272677fab02575e84945f03eca517acc544cc",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x0e8d5ad992b37f145ed1985d4bffcbc3d5bd6be3",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xaadc2d4261199ce24a4b0a57370c4fcf43bb60aa",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xacf63e56fd08970b43401492a02f6f38b6635c91",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x790b2cf29ed4f310bf7641f013c65d4560d28371",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xe012baf811cf9c05c408e879c399960d1f305903",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x23581767a106ae21c074b2276d25e5c3e136a68b",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xd1258db6ac08eb0e625b75b371c023da478e94a9",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x394e3d3044fc89fcdd966d3cb35ac0b32b0cda91",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xe012baf811cf9c05c408e879c399960d1f305903",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x8821bee2ba0df28761afff119d66390d594cd280",
  //   },

  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xc2c747e0f7004f9e8817db2ca4997657a7746928",
  //   },

  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0x8c186802b1992f7650ac865d4ca94d55ff3c0d17",
  //   },
  //   {
  //     name: "",
  //     symbol: "",
  //     address: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
  //   },
  // ],

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
