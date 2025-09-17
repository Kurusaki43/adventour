import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export const TourImagesCarousel = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMain, setEmblaMain] = useState<EmblaCarouselType | undefined>();

  useEffect(() => {
    if (!emblaMain) return;
    const onSelect = () => {
      setSelectedIndex(emblaMain.selectedScrollSnap());
    };
    emblaMain.on("select", onSelect);
    return () => {
      emblaMain.off("select", onSelect);
    };
  }, [emblaMain]);

  return (
    <div className="w-full mx-auto space-y-4">
      <Carousel className="w-full relative" setApi={setEmblaMain}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <img
                src={`/uploads/tours/${src}`}
                alt={`Casbah ${i + 1}`}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-16 absolute z-99 border-0" />
        <CarouselNext className="-translate-x-16 absolute z-99 border-0" />
      </Carousel>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => emblaMain?.scrollTo(i)}
            className={`rounded-lg overflow-hidden border-2 transition ${
              selectedIndex === i
                ? "border-primary border-2"
                : "border-transparent hover:border-gray-400"
            }`}
          >
            <img
              src={`/uploads/tours/${src}`}
              alt={`Thumbnail ${i + 1}`}
              className="size-8 sm:size-12 md:size-14 lg:size-18 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
