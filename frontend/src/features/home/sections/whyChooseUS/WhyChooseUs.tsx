import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import { BiRightArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const USP_ITEMS = [
  {
    key: "price",
    title: "Best price guarantee",
    desc: "Found a lower price? We'll match it and give an extra 5% off.",
    proof: "Price-checked across major vendors.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l4 4L19 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "support",
    title: "24/7 support",
    desc: "Live chat and phone support whenever you need help.",
    proof: "Avg response: under 2 minutes.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M21 15a2 2 0 0 1-2 2h-3l-4 4v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "guides",
    title: "Local expert guides",
    desc: "Vetted local guides who know the best spots and stories.",
    proof: "ID verified + traveller ratings.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM2 22c0-3.3 3.6-6 10-6s10 2.7 10 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "cancel",
    title: "Easy cancellation",
    desc: "Flexible policies with clear, fast refunds.",
    proof: "Free up to 48 hours before start (most tours).",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 6v6l4 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50">
      <div className="main-container">
        <h2 className="section-title">Why Booking With Us</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
          {USP_ITEMS.map((item) => (
            <FeatureCard item={item} key={item.key} />
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 capitalize">
            <strong className="text-primary">4.8★</strong> average rating —
            <span className="ml-1">10k+ travelers served</span>
          </div>
          <Link to="/about">
            <Button className="rounded-full">
              Learn more
              <BiRightArrowAlt />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
