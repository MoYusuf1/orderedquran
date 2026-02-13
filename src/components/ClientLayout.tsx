"use client";

import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ReadingProgress from "./ReadingProgress";

function LayoutInner({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only skip-link">
        Skip to main content
      </a>
      <Navbar />
      <ReadingProgress />
      <Sidebar />
      <div id="main-content" className={`mainContent${isOpen ? " sidebarOpen" : ""}`}>
        {children}
      </div>
    </>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  );
}
