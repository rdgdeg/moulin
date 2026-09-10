"use client";

import { useEffect } from "react";
import Script from "next/script";

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="ga-init">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('consent', 'default', { analytics_storage: 'denied' });
        gtag('config', '${id}', { anonymize_ip: true });
      `}</Script>
      <ConsentListener />
    </>
  );
}

function ConsentListener() {
  useEffect(() => {
    const apply = () => {
      if (window.localStorage.getItem("hunelle-cookies") === "accepted") {
        window.gtag?.("consent", "update", { analytics_storage: "granted" });
      }
    };
    apply();
    window.addEventListener("hunelle-analytics", apply);
    return () => window.removeEventListener("hunelle-analytics", apply);
  }, []);
  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
