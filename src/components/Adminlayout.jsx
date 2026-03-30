import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: (
      <img src="/dashboard-icon.png" alt="Dashboard Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/homepage",
    label: "Homepage",
    icon: (
      <img src="/home-icon.png" alt="Homepage Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/books",
    label: "Books",
    icon: (
      <img src="/books-icon.png" alt="Books Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/journals",
    label: "Journals",
    icon: (
      <img src="/journals-icon.png" alt="Journals Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/teachings",
    label: "Teachings",
    icon: (
      <img src="/teachings-icon.png" alt="Teachings Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/blog",
    label: "Blog",
    icon: (
      <img src="/blog-icon.png" alt="Blog Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: (
      <img src="/analytic-icon.png" alt="Analytics Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/subscribers",
    label: "Subscribers",
    icon: (
      <img src="/subscribers-icon.png" alt="Subscribers Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
];

const dashboardOnlyItems = [
  {
    path: "/menu",
    label: "Menu",
    icon: (
      <img src="/menu-icon.png" alt="Menu Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
  {
    path: "/settings",
    label: "Settings",
    icon: (
      <img src="/settings-icon.png" alt="Settings Icon" className="w-5 h-5 transition-opacity duration-150" />
    ),
  },
];

export default function AdminLayout({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-5 py-3.5 text-sm transition-all duration-150 border-r-[3px] ${
      isActive
        ? "bg-white/50 text-[#1a1612] font-semibold border-[#c5a355] [&>span]:opacity-100"
        : "text-[#888] font-normal border-transparent hover:text-[#555] hover:bg-white/30 [&>span]:opacity-40 hover:[&>span]:opacity-70"
    }`;

  const navLinkClassSpaced = ({ isActive }) =>
    `flex items-center gap-3.5 px-5 py-5 text-sm transition-all duration-150 border-r-[3px] ${
      isActive
        ? "bg-white/50 text-[#1a1612] font-semibold border-[#c5a355] [&>span]:opacity-100"
        : "text-[#888] font-normal border-transparent hover:text-[#555] hover:bg-white/30 [&>span]:opacity-40 hover:[&>span]:opacity-70"
    }`;

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-[#FEF3C7] p-2 rounded-lg border border-[#e7d27d] shadow-sm"
      >
        <svg className="w-6 h-6 text-[#1a1612]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[210px] bg-[#FEF3C7] border-r border-[#e7d27d] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* MOBILE CLOSE BUTTON */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 lg:hidden text-[#1a1612] p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div>
            <img src="/LTlogo1.png" alt="" className="h-10 w-22" />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeSidebar}
              className={isDashboard ? navLinkClass : navLinkClassSpaced}
            >
              <span className="flex items-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          {/* Dashboard only — Menu & Settings */}
          {isDashboard &&
            dashboardOnlyItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={navLinkClass}
              >
                <span className="flex items-center">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
        </nav>

        <hr className="border-t border-[#b48557]" />

        {/* Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-5 py-3 text-sm text-red-500 hover:text-red-700 hover:bg-red-50/50 transition-all duration-150 border-r-[3px] border-transparent"
          >
            <span className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-[210px] flex-1 min-h-screen bg-white overflow-y-auto pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}