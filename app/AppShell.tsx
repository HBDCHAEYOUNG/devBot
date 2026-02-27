"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/ui/index";
import AppHeader from "@/widgets/AppHeader/ui/AppHeader";
import { AppSidebar } from "@/widgets/AppSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname?.startsWith("/landing") ?? false;

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppHeader />
      <AppSidebar />
      <main className="min-w-0 overflow-hidden flex-1">{children}</main>
    </SidebarProvider>
  );
}
