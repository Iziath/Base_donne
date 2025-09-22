import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Heart,
  Building2,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  CalendarDays,
  Target
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Vue d'ensemble",
    items: [
      { name: "Tableau de bord", icon: LayoutDashboard, href: "/", badge: null },
      { name: "Activités du jour", icon: CalendarDays, href: "/today", badge: "5" },
    ]
  },
  {
    title: "Gestion",
    items: [
      { name: "Projets", icon: FolderOpen, href: "/projects", badge: null },
      { name: "Activités", icon: Target, href: "/activities", badge: null },
      { name: "Bénéficiaires", icon: Heart, href: "/beneficiaries", badge: null },
      { name: "Équipe", icon: Users, href: "/team", badge: null },
      { name: "Partenaires", icon: Building2, href: "/partners", badge: null },
    ]
  },
  {
    title: "Suivi & Reporting",
    items: [
      { name: "Rapports", icon: BarChart3, href: "/reports", badge: null },
      { name: "Documents", icon: FileText, href: "/documents", badge: null },
    ]
  },
  {
    title: "Administration",
    items: [
      { name: "Paramètres", icon: Settings, href: "/settings", badge: null },
      { name: "Aide", icon: HelpCircle, href: "/help", badge: null },
    ]
  }
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className={cn("w-sidebar bg-sidebar-background border-r border-sidebar-border", className)}>
      <div className="flex flex-col h-full">
        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-between h-10 px-3",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      onClick={() => navigate(item.href)}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-primary rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">Version 1.0</h4>
            <p className="text-xs text-white/80">Système de gestion RAMP-BENIN</p>
          </div>
        </div>
      </div>
    </div>
  );
}