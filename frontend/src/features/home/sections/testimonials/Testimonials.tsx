import TestimonialCard from "./TestimonialCard";
import Carousel from "@/components/common/Carousel";

const testimonials = [
  {
    name: "Laura Méndez",
    trip: "Sahara Desert Sunset Tour",
    image: "/images/user1.jpg",
    review:
      "The Sahara was beyond magical! Riding camels under the sunset felt like a dream. Adventour made everything smooth, safe, and unforgettable.",
  },
  {
    name: "James Wilson",
    trip: "Atlas Mountains Hiking Adventure",
    image: "/images/user2.jpg",
    review:
      "This was the best hiking trip I’ve ever done. Our guide knew every hidden path and shared amazing local stories. Adventour really knows how to craft adventures.",
  },
  {
    name: "Amina Bensalah",
    trip: "Mediterranean Coastal Escape",
    image: "/images/user3.jpg",
    review:
      "From the crystal-clear waters to the delicious local food, everything was perfect. Adventour’s organization and attention to detail exceeded my expectations.",
  },
  {
    name: "David Chen",
    trip: "Historic Cities Discovery Tour",
    image: "/images/user4.jpg",
    review:
      "Exploring ancient cities with Adventour felt like stepping back in time. The balance between culture, comfort, and adventure was just right.",
  },
  {
    name: "Sophie Martin",
    trip: "Desert & Oasis Experience",
    image: "/images/user5.jpg",
    review:
      "I loved every minute of this trip. Sleeping under the stars in the desert was magical, and the hospitality of the guides made me feel at home.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-b">
      <div className="main-container">
        <h2 className="section-title">Customer Review</h2>
        <Carousel
          items={testimonials}
          render={(item) => <TestimonialCard testimonial={item} />}
        />
      </div>
    </section>
  );
};

export default Testimonials;
