import HeroSearchBar from "./HeroSearchBar";

const Hero = () => {
  return (
    <div className="-mt-[149px] relative h-screen min-h-[950px] hero-bg bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-60 h-screen min-h-[950px]" />
      <div className="main-container relative z-10 min-h-[950px] grid place-content-center gap-8">
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-white font-bold capitalize text-[clamp(30px,6vw,72px)] max-w-2xl leading-snug">
            Discover Your Next Adventure
          </h1>
          <p className="text-white text-[clamp(20px,3vw,32px)] font-light capitalize mb-8">
            Book tours - explore destinations - travel with the best guides.
          </p>
        </div>
        <HeroSearchBar />
      </div>
    </div>
  );
};

export default Hero;

/* -mt-[149px]*/
