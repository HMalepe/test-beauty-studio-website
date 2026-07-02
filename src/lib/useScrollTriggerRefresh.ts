"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Re-sync ScrollTrigger after layout shifts (dynamic heroes, sticky sections). */
export function useScrollTriggerRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    refresh();
    window.addEventListener("load", refresh);

    const observer = new ResizeObserver(() => refresh());
    observer.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
