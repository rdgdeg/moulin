import Image from "next/image";

export function PageHero({
  kicker,
  title,
  lead,
  image,
}: {
  kicker: string;
  title: string;
  lead: string;
  image: string;
}) {
  return (
    <section className="relative isolate min-h-[62vh] overflow-hidden bg-ink pt-20 text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex min-h-[62vh] items-center justify-center px-5">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/90">
            {kicker}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.08] font-medium sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/95">{lead}</p>
        </div>
      </div>
    </section>
  );
}
