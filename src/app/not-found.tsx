import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <section>
      <h1>404</h1>
    </section>
  );
};

export default NotFound;
