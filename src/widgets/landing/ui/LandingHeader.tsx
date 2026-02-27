import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="bg-background common-padding fixed top-0 left-0 flex items-center justify-between gap-2 z-10 w-full shadow-xs h-16!">
      <div className="flex items-center gap-2 justify-center w-full">
        <Link
          href="/?fromLanding=1"
          className="cursor-pointer text-xl font-light fixed left-8"
        >
          Devbot
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="#intro" className="hover:font-semibold">
            서비스 소개
          </Link>
          <Link href="#features" className="hover:font-semibold">
            주요 기능
          </Link>
          <Link href="#templates" className="hover:font-semibold">
            템플릿 유형
          </Link>
        </nav>
      </div>
    </header>
  );
}
