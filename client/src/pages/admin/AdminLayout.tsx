import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard,
  LogOut,
  PanelLeft,
  FileText,
  Scale,
  Megaphone,
  BookOpen,
  HelpCircle,
  Users,
  Settings,
  Image,
  ExternalLink,
  Video,
  Bot,
  Tag,
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState, ReactNode } from "react";
import { useLocation } from "wouter";
import AdminLogin from "./AdminLogin";
import { Loader2 } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",        path: "/admin" },
  { icon: FileText,        label: "Páginas",          path: "/admin/pages" },
  { icon: Scale,           label: "Soluções",         path: "/admin/practice-areas" },
  { icon: Megaphone,       label: "Landing Pages",    path: "/admin/landing-pages" },
  { icon: BookOpen,        label: "Blog",             path: "/admin/blog" },
  { icon: Tag,             label: "Categorias",       path: "/admin/categories" },
  { icon: Video,           label: "Vídeos",           path: "/admin/videos" },
  { icon: HelpCircle,      label: "FAQ",              path: "/admin/faq" },
  { icon: Users,           label: "Leads",            path: "/admin/leads" },
  { icon: Bot,             label: "Dr. Ben",          path: "/admin/dr-ben" },
  { icon: Image,           label: "Mídia",            path: "/admin/media" },
  { icon: Settings,        label: "Configurações",    path: "/admin/settings" },
];

const SIDEBAR_WIDTH_KEY = "admin-sidebar-width";
const DEFAULT_WIDTH = 240;
const MIN_WIDTH = 200;
const MAX_WIDTH = 380;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, loading, logout } = useAdminAuth();
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: `${NAVY}08` }}>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo-brand-gold.png"
            alt="Mauro Monção"
            className="h-14 w-auto object-contain opacity-90"
          />
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: GOLD }} />
        </div>
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin />;
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
    >
      <AdminSidebarContent setSidebarWidth={setSidebarWidth} admin={admin} logout={logout}>
        {children}
      </AdminSidebarContent>
    </SidebarProvider>
  );
}

function AdminSidebarContent({
  children,
  setSidebarWidth,
  admin,
  logout,
}: {
  children: ReactNode;
  setSidebarWidth: (w: number) => void;
  admin: { name: string; email: string };
  logout: () => Promise<void>;
}) {
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const activeMenuItem = menuItems.find((item) =>
    location === "/admin" ? item.path === "/admin" : location.startsWith(item.path) && item.path !== "/admin"
  ) || menuItems[0];

  useEffect(() => {
    if (isCollapsed) setIsResizing(false);
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0"
          disableTransition={isResizing}
          style={{ background: NAVY }}
        >
          {/* ── Header / Logo ── */}
          <SidebarHeader className="h-16 justify-center border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3 px-2 w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none shrink-0"
                style={{ background: "rgba(232,184,75,0.15)" }}
              >
                <PanelLeft className="h-4 w-4" style={{ color: GOLD }} />
              </button>
              {!isCollapsed && (
                <div className="flex items-center min-w-0 flex-1">
                  <img
                    src="/logo-brand-gold.png"
                    alt="Mauro Monção Advogados"
                    className="h-8 w-auto object-contain"
                    style={{ maxWidth: "160px" }}
                  />
                </div>
              )}
            </div>
          </SidebarHeader>

          {/* ── Menu ── */}
          <SidebarContent className="gap-0 py-3">
            <SidebarMenu className="px-2 space-y-0.5">
              {menuItems.map((item) => {
                const isActive =
                  location === "/admin"
                    ? item.path === "/admin"
                    : location.startsWith(item.path) && item.path !== "/admin";
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className="h-10 transition-all font-normal rounded-xl"
                      style={
                        isActive
                          ? { background: GOLD, color: NAVY }
                          : { color: "rgba(255,255,255,0.75)" }
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* Ver site */}
            <div className="px-2 py-3 mt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <SidebarMenuButton
                onClick={() => window.open("/", "_blank")}
                tooltip="Ver site"
                className="h-10 font-normal rounded-xl"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ver site</span>
              </SidebarMenuButton>
            </div>
          </SidebarContent>

          {/* ── Footer / User ── */}
          <SidebarFooter className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors w-full text-left focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Avatar className="h-8 w-8 border shrink-0" style={{ borderColor: `${GOLD}60` }}>
                    <AvatarFallback className="text-xs font-bold" style={{ background: GOLD, color: NAVY }}>
                      {admin.name?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs font-semibold truncate leading-none" style={{ color: "rgba(255,255,255,0.9)" }}>{admin.name}</p>
                    <p className="text-[10px] truncate mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{admin.email}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Resize handle */}
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => { if (!isCollapsed) setIsResizing(true); }}
          style={{ zIndex: 50, background: isResizing ? `${GOLD}60` : "transparent" }}
        />
      </div>

      {/* ── Main content ── */}
      <SidebarInset style={{ background: "#F8F9FA" }}>
        {isMobile && (
          <div
            className="flex border-b h-14 items-center justify-between px-2 backdrop-blur sticky top-0 z-40"
            style={{ background: NAVY, borderColor: `${GOLD}30` }}
          >
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg" style={{ background: "rgba(255,255,255,0.1)", color: GOLD }} />
              <span className="text-sm font-semibold tracking-tight" style={{ color: GOLD }}>
                {activeMenuItem?.label ?? "Painel"}
              </span>
            </div>
            <img
              src="/logo-brand-gold.png"
              alt="Mauro Monção"
              className="h-8 w-auto object-contain"
            />
          </div>
        )}
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
