import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "@/constants/sliderSettings";

const SliderWrapper = ({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings?: Settings;
}) => {
  const mergedSettings = { ...sliderSettings, ...settings };
  return (
    <Slider
      {...mergedSettings}
      className="bg-transparent max-w-sm w-full sm:max-w-full mx-auto [&_.slick-list]:overflow-visible"
    >
      {children}
    </Slider>
  );
};

export default SliderWrapper;
