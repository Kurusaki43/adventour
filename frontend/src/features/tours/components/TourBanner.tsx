import { formatCurrency } from "@/features/admin/utils/formatCurrency";

type TourBannerProps = {
  name: string;
  price: number;
  image: string;
  priceDiscount: number | undefined;
};

const TourBanner = ({ name, price, image, priceDiscount }: TourBannerProps) => {
  return (
    <div className="relative w-full mx-auto h-[420px] bg-orange-400 overflow-hidden ">
      <img
        className="w-full h-full object-cover object-center"
        src={`/uploads/tours/${image}`}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute left-0 bottom-0 w-full flex flex-col p-4 sm:p-8 text-white">
        <p className="text-[clamp(22px,5vw,32px)] text-white font-bold capitalize ">
          {name}
        </p>
        <p className="">
          <span className="font-bold text-[clamp(18px,5vw,24px)]">
            {priceDiscount && priceDiscount > 0
              ? formatCurrency(priceDiscount)
              : formatCurrency(price)}
          </span>
          <span className="ml-2">per Person</span>
        </p>
      </div>
    </div>
  );
};

export default TourBanner;
