"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PrinceLoader } from "@/components/ui/loader/PrinceLoader";

export default function Template({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname !== '/');

  useEffect(() => {
    if (pathname === '/') {
      setLoading(false);
      return;
    }

    // Enforce 0.5s minimum delay to show the loading state properly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-start pt-[20vh] transition-opacity duration-300">
          <PrinceLoader size="lg" />
        </div>
      )}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-500 ease-out"}>
        {children}
      </div>
    </>
  );
}
