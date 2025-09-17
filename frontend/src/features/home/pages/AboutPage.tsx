const AboutPage = () => {
  return (
    <div>
      <section className="-mt-[149px] bg-[url(/images/hero-1-bg.jpg)] bg-cover bg-bottom relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              About us
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
