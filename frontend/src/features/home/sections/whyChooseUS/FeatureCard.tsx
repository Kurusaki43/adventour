import type { JSX } from "react";

type FeatureCardProps = {
  item: {
    key: string;
    title: string;
    icon: JSX.Element;
    desc: string;
    proof: string;
  };
};

const FeatureCard = ({ item }: FeatureCardProps) => {
  return (
    <article
      className="bg-white backdrop-blur rounded-xl p-5 xl:p-6 shadow-soft hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primary duration-300"
      aria-label={item.title}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="text-primary bg-blue-50 rounded-full p-3">
          {item.icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl capitalize font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="text-sm lg:text-base text-gray-600 mt-2">{item.desc}</p>
          <p className="text-xs text-gray-400">{item.proof}</p>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
