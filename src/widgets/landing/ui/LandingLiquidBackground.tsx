"use client";

import dynamic from "next/dynamic";

const LiquidEther = dynamic(
  () => import("@/lib/LiquidEther").then((m) => m.default),
  { ssr: false }
);

/** 랜딩 페이지 전체 배경용 Liquid Ether (클라이언트 전용, 터치/클릭 통과) */
export function LandingLiquidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <LiquidEther
        className="h-full w-full"
        // 그레이 계열 + 반짝임 (진한 톤 제외)
        colors={["#a78bfa", "#9ca3af", "#e5e7eb"]}
        resolution={0.4}
        autoDemo
        autoSpeed={0.4}
        autoIntensity={1.8}
      />
    </div>
  );
}
