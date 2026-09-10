"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const slides: {
  id: "salles" | "restaurant" | "repas" | "lieu";
  image: string;
  href: Exclude<Pathname, "/salles/[slug]" | "/savoir-faire/[slug]">;
}[] = [
  { id: "salles", image: "/images/hero/salles.jpg", href: "/salles" },
  { id: "restaurant", image: "/images/hero/restaurant.jpg", href: "/restaurant" },
  { id: "repas", image: "/images/hero/repas.jpg", href: "/repas-a-domicile" },
  { id: "lieu", image: "/images/hero/hunelle.jpg", href: "/le-moulin" },
];

export function HeroSlider() {
  const t = useTranslations("home.slides");
  const home = useTranslations("home");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[index];

  function go(step: number) {
    setIndex((current) => (current + step + slides.length) % slides.length);
  }

  return (
    <section
      className="flex min-h-[100svh] flex-col bg-moss-deep text-white md:relative md:block md:h-[100svh] md:min-h-[640px] md:overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:aspect-auto">
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover object-center ${i === index ? "kenburns" : ""}`}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/20 md:bg-black/25" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col md:absolute md:inset-0 md:flex md:h-full md:flex-none md:items-end">
        <div className="flex w-full flex-1 flex-col justify-center bg-moss px-5 pt-6 pb-[4.75rem] text-white sm:px-10 md:max-w-xl md:flex-none md:justify-start md:px-6 md:py-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/85">
            {t(`${slide.id}.kicker`)}
          </p>
          <h1
            key={slide.id}
            className="font-display mt-2 text-[1.65rem] leading-[1.12] font-medium sm:text-4xl"
          >
            {t(`${slide.id}.title`)}
          </h1>
          <p className="mt-2.5 max-w-md text-[0.92rem] leading-relaxed text-white/95 sm:mt-3 sm:text-[0.95rem]">
            {t(`${slide.id}.text`)}
          </p>
          <Link
            href={slide.href}
            className="mt-5 inline-flex min-h-11 items-center bg-white px-5 py-2.5 text-sm font-medium tracking-wide text-moss md:mt-6"
          >
            {t(`${slide.id}.cta`)}
          </Link>
          <div className="mt-5 flex items-center justify-between gap-4 md:mt-6">
            <div className="flex items-center gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.id}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? "w-9 bg-white" : "w-4 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={home("prevSlide")}
                className="flex h-9 w-9 items-center justify-center border border-white/40 text-white transition hover:bg-white hover:text-moss"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={home("nextSlide")}
                className="flex h-9 w-9 items-center justify-center border border-white/40 text-white transition hover:bg-white hover:text-moss"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
