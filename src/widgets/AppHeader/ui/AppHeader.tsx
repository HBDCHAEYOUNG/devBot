import { SidebarTrigger } from "@/ui/index";
import Link from "next/link";
import { SettingsDialog } from "@/features/generator-settings";

export default function AppHeader() {
  return (
    <header className="bg-background common-padding fixed top-0 left-0 flex items-center justify-between gap-2 z-10 w-full shadow-xs">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="z-50 cursor-pointer" />
        <Link href="/" className="cursor-pointer text-xl font-light">
          Devbot
        </Link>
      </div>
      <SettingsDialog />
    </header>
  );
}
