"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
const navItems = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
  },
  {
    label: "Trade History",
    href: "/trade-history",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
  {
    label: "System Status",
    href: "/system-status",
  },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 bg-[#0b0f14]">
      <div className="mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold text-slate-100">
            ArbitrageEngine
          </Link>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? "text-slate-100"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-red-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-950"
          >
            <FaShieldAlt size={14} />
            Emergency Stop
          </button>

          <button
            type="button"
            className="text-slate-400 transition-colors hover:text-slate-200"
          >
            <FiSettings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
