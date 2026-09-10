"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./Icons";

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
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-moss-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
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
            className={`object-cover ${i === index ? "kenburns" : ""}`}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex h-full items-end">
        <div className="w-full max-w-2xl bg-moss px-7 pt-10 pb-20 text-white sm:px-12 sm:pt-14 sm:pb-16">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/85">
            {t(`${slide.id}.kicker`)}
          </p>
          <h1
            key={slide.id}
            className="font-display mt-3 text-4xl leading-[1.08] font-medium sm:text-6xl"
          >
            {t(`${slide.id}.title`)}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/95">{t(`${slide.id}.text`)}</p>
          <Link
            href={slide.href}
            className="mt-8 inline-flex min-h-12 items-center bg-white px-6 py-3 text-sm font-medium tracking-wide text-moss"
          >
            {t(`${slide.id}.cta`)}
          </Link>
          <div className="mt-10 flex items-center justify-between gap-4">
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
                className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:bg-white hover:text-moss"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={home("nextSlide")}
                className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:bg-white hover:text-moss"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#accueil-suite"
        className="absolute inset-x-0 bottom-7 z-20 mx-auto flex w-fit flex-col items-center gap-1 text-[0.78rem] font-semibold tracking-[0.22em] text-white uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]"
      >
        {home("scroll")}
        <ChevronDownIcon className="scroll-hint-chevron h-5 w-5" />
      </a>
    </section>
  );
}
