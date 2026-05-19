import { useState, useEffect } from "react";
import type { ThemeMode } from "@/types";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode) {
  const resolved = mode === "system" ? getSystemTheme() : mode;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem("theme") as ThemeMode) ?? "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark");

  return { theme, setTheme, isDark };
}
