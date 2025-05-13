"use client";

import { useEffect, useState } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: [Breakpoint, number][] = [
  ["2xl", 1536],
  ["xl", 1280],
  ["lg", 1024],
  ["md", 768],
  ["sm", 640],
];

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      for (const [bp, minWidth] of breakpoints) {
        if (width >= minWidth) {
          setBreakpoint(bp);
          return;
        }
      }
      setBreakpoint("base");
    }

    updateBreakpoint(); // 초기 계산
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  });

  return breakpoint;
}
