"use client";

import { Step, useAppStore } from "@/stores/appStore";

import SelectChain from "@/components/SelectChain";
import SelectToken from "@/components/SelectToken";
import LiveView from "@/components/LiveView";

const Page = () => {
  const step = useAppStore((state) => state.step);

  return (
    <section className="grid place-items-center px-4 py-16">
      {step === Step.SelectChain && <SelectChain />}
      {step === Step.SelectToken && <SelectToken />}
      {step === Step.LiveView && <LiveView />}
    </section>
  );
};

export default Page;
