"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 120, suffix: "K+", label: "Shipments Delivered", decimals: 0 },
  { value: 48, suffix: "", label: "States Covered", decimals: 0 },
  { value: 15, suffix: "+", label: "Years in Business", decimals: 0 },
  { value: 99.2, suffix: "%", label: "On-Time Delivery", decimals: 1 },
];

function useCountUp(target: number, decimals: number, started: boolean) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return display.toFixed(decimals);
}

function Stat({
  value,
  suffix,
  label,
  decimals,
  started,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals: number;
  started: boolean;
  index: number;
}) {
  const display = useCountUp(value, decimals, started);

  return (
    <div
      className="text-center"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <p className="font-display text-4xl font-bold tabular-nums text-brand-900">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-slate-200 bg-white">
      <div
        ref={ref}
        className="container-site grid grid-cols-2 gap-8 py-12 lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <Stat key={stat.label} {...stat} started={started} index={i} />
        ))}
      </div>
    </section>
  );
}

