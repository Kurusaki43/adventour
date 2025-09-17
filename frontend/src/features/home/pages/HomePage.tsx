import AboutUs from "../sections/aboutUs/AboutUs";
import Hero from "../sections/hero/Hero";
import PopularTours from "../sections/popularTours/PopularTours";
import Testimonials from "../sections/testimonials/Testimonials";
import WhyChooseUs from "../sections/whyChooseUS/WhyChooseUs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularTours />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
    </>
  );
};

export default HomePage;
