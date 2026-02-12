import "@/styles/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/ui/index";
import { AppSidebar } from "@/widgets/AppSidebar";

export const metadata = {
  title: "AI 기술 블로그 글 생성기",
  description: "개발자를 위한 AI 기술 블로그 자동 생성 서비스",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="min-w-0 overflow-hidden">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
