import Image from "next/image";
import { Reveal } from "./Reveal";

export type MosaicPhoto = {
  src: string;
  caption: string;
  className?: string;
};

export function PhotoMosaic({
  title,
  photos,
  theme = "ink",
}: {
  title?: string;
  photos: MosaicPhoto[];
  theme?: "ink" | "paper";
}) {
  const light = theme === "paper";

  return (
    <section className={light ? "bg-white" : "bg-ink"}>
      {title ? (
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <Reveal>
            <h2
              className={`font-display text-4xl ${light ? "text-ink" : "text-white"}`}
            >
              {title}
            </h2>
          </Reveal>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-1.5 px-1.5 pb-1.5 lg:grid-cols-4">
        {photos.map((photo, index) => {
          const featured = index === 0 && !photo.className;
          return (
            <figure
              key={`${photo.src}-${index}`}
              className={`group relative overflow-hidden ${
                photo.className ??
                (featured
                  ? "col-span-2 row-span-2 min-h-64 lg:min-h-[28rem]"
                  : "min-h-44 lg:min-h-52")
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                sizes="(min-width:1024px) 40vw, 50vw"
                priority={index === 0}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm text-white opacity-0 transition duration-300 group-hover:opacity-100">
                {photo.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
