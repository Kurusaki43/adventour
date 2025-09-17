import { Button } from "@/components/ui/button";
import img from "@/assets/about.jpg";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="bg-zinc-800 text-white relative py-18">
      <div className="main-container ">
        <h2 className="section-title">About Us</h2>
        {/* Left Column - Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 max-w-2xl">
            <h3 className="text-xl text-white font-bold mb-6">
              Your Gateway to Unforgettable Adventures
            </h3>
            <p className="mb-4 leading-relaxed">
              Adventour was born from a simple belief: that travel should be
              more than just moving from one place to another — it should be an
              adventure filled with stories, connections, and memories.
            </p>
            <p className="mb-4 leading-relaxed">
              We bring together expert local guides, breathtaking destinations,
              and well-crafted itineraries to give travelers unique journeys
              across the globe. Whether it’s hiking rugged mountains, exploring
              historic cities, or discovering hidden gems, Adventour is here to
              make every trip unforgettable.
            </p>

            <Link to="/about">
              <Button size="lg" className="rounded-full shadow-md mt-10">
                Learn more
                <BiRightArrow />
              </Button>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:absolute top-0 right-0 bottom-0 order-1 lg:order-2 lg:w-[50%] h-[100%] min-h-96">
            <img
              src={img}
              alt="Adventour Experience"
              className="w-full h-full object-cover"
            />
            {/* Optional Stat Badge */}
            <div className="absolute top-4 right-4 bg-white px-5 py-3 rounded-xl shadow-lg">
              <p className="text-gray-900 font-bold text-lg">10k+ Travelers</p>
              <p className="text-sm text-gray-500">
                500+ Tours Inside the country
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
