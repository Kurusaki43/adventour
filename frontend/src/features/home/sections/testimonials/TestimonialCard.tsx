import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Quote } from "lucide-react";

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: {
    image: string;
    name: string;
    trip: string;
    review: string;
  };
}) => {
  return (
    <div className="bg-white p-10 border hover:shadow-lg transition duration-300 relative h-full min-h-[360px]">
      <Quote className="size-8 text-black absolute left-10 top-10 rotate-180" />

      <p className="text-gray-600 text-md leading-relaxed italic mt-14 line-clamp-5">
        {testimonial.review}
      </p>
      <div className="flex flex-row gap-4 items-start mt-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="size-16 rounded-full object-cover"
        />
        <div>
          <span className="font-semibold capitalize text-lg text-gray-700">
            {testimonial.name}
          </span>

          <Rating value={4} readOnly className="max-w-18 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
