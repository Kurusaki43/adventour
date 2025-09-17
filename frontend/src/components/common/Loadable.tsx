import { Suspense, type JSX } from "react";
import Spinner from "../Spinner";

// --- Helper: wrap lazy components with Suspense ---
export const Loadable = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);
