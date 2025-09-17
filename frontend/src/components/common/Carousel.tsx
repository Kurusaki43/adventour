import type { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselComponent,
} from "../ui/carousel";

type CarouselProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
  showButtons?: boolean;
  autoPlay?: boolean;
  delay?: number;
};

const Carousel = <T,>({
  items,
  render,
  showButtons = true,
  autoPlay = true,
  delay = 5000,
}: CarouselProps<T>) => {
  const autoPlayPlugin = Autoplay({ delay, stopOnInteraction: true });
  return (
    <CarouselComponent
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={autoPlay ? [autoPlayPlugin] : []}
      className="w-full relative"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
          >
            <div className="p-1 max-w-sm mx-auto">{render(item)}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showButtons && (
        <div className="absolute -top-6 right-1/2 sm:right-10 -translate-x-1/2 sm:translate-x-0 flex items-center mb-4">
          <CarouselPrevious />
          <CarouselNext className="mr-4" />
        </div>
      )}
    </CarouselComponent>
  );
};

export default Carousel;
