import * as React from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function SiteHeader() {
  const [theme, setTheme] = React.useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const logo =
    theme === "dark"
      ? "/candidate-tracker-white.svg"
      : "/candidate-tracker-gray.svg";

  return (
    <header className="flex h-20 items-center justify-between border-b px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Candidate Tracker Logo"
          className="h-32 w-32 object-contain"
        />
      </div>
      <AnimatedThemeToggler />
    </header>
  );
}
