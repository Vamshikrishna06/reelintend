import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, Bookmark, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/feed", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/feed", icon: PlusCircle, label: "Add" },
    { path: "/saved", icon: Bookmark, label: "Saved" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-strong border-t border-white/5">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className="flex flex-col items-center gap-1 p-2 min-w-[60px]"
              >
                <div
                  className={`relative ${
                    item.label === "Add"
                      ? "w-12 h-8 rounded-lg gradient-primary flex items-center justify-center"
                      : ""
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      item.label === "Add"
                        ? "text-primary-foreground"
                        : isActive
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
