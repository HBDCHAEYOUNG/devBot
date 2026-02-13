import { SidebarTrigger } from "@/ui/index";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="bg-background common-padding fixed top-0 left-0 flex items-center gap-2 z-10 w-full shadow-xs">
      <SidebarTrigger className="z-50 cursor-pointer" />
      <Link href="/" className="cursor-pointer text-xl font-light">
        Devbot
      </Link>
    </header>
  );
}
