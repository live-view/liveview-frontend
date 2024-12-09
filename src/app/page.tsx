"use client";

import { Step, useAppStore } from "@/stores/appStore";

import SelectChain from "@/components/SelectChain";
import SelectAddress from "@/components/SelectAddress";
import LiveView from "@/components/LiveView";

const Page = () => {
  const step = useAppStore((state) => state.step);

  return (
    <section className="grid place-items-center px-4 py-16">
      {step === Step.SelectChain && <SelectChain />}
      {step === Step.SelectAddress && <SelectAddress />}
      {step === Step.LiveView && <LiveView />}
    </section>
  );
};

export default Page;
