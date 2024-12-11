"use client";

import { Step, useAppStore } from "@/stores/appStore";

import SelectChain from "@/components/SelectChain";
import SelectToken from "@/components/SelectToken";
import LiveView from "@/components/LiveView";

const Page = () => {
  const step = useAppStore((state) => state.step);

  return (
    <section className="grid h-screen place-items-center px-4">
      {step === Step.SelectChain && <SelectChain />}
      {step === Step.SelectToken && <SelectToken />}
      {step === Step.LiveView && <LiveView />}
    </section>
  );
};

export default Page;
