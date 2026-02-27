import { LandingHeader } from "@/widgets/landing";

export const metadata = {
  title: "Devbot - 랜딩",
  description: "Devbot 소개 및 기능 안내 랜딩 페이지",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 overflow-hidden flex-1">
      <LandingHeader />
      <main className="flex flex-col min-h-svh flex-1 common-padding max-w-6xl mx-auto w-full space-y-16 py-12">
        {children}
      </main>
    </div>
  );
}
