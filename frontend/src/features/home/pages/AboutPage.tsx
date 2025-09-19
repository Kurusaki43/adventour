import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              About Us
            </h1>
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
              Your Adventure Awaits
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Connecting thrill-seekers with extraordinary adventures around the
              world. From mountain peaks to ocean depths, we make your wildest
              dreams accessible and unforgettable.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Where Adventure Begins
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Founded in 2020 by a group of passionate adventurers who
                  believed that extraordinary experiences shouldn't be limited
                  to the few. What started as weekend hiking trips with friends
                  has evolved into a global platform connecting adventure
                  enthusiasts with life-changing experiences.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our journey began when we realized the gap between adventure
                  seekers and authentic, safe, and memorable experiences. We set
                  out to bridge that gap, curating tours that are both thrilling
                  and responsible, working with local guides who know their
                  terrain like the back of their hand.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/images/modern-office-space-with-diverse-team-collaboratin.jpg"
                  alt="Our adventure team planning expeditions"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-center text-foreground mb-12">
                Adventure Milestones
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-4">
                      2020
                    </Badge>
                    <h4 className="text-lg font-semibold mb-2">
                      Adventour Founded
                    </h4>
                    <p className="text-muted-foreground">
                      Started with 3 adventure enthusiasts and a shared passion
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-4">
                      2022
                    </Badge>
                    <h4 className="text-lg font-semibold mb-2">
                      1,000 Adventures
                    </h4>
                    <p className="text-muted-foreground">
                      Successfully organized our first thousand adventure tours
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-4">
                      2024
                    </Badge>
                    <h4 className="text-lg font-semibold mb-2">
                      Global Adventures
                    </h4>
                    <p className="text-muted-foreground">
                      Offering tours across 6 continents and 40+ countries
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet Our Adventure Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate adventurers who make your dream expeditions a
                reality every day.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <img
                    src="/images/ceo-headshot.png"
                    alt="CEO headshot"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-3">
                    CEO & Lead Explorer
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Former expedition leader with 15+ years exploring remote
                    destinations and building sustainable tourism.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <img
                    src="/images/cto-headshot.png"
                    alt="CTO headshot"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                  <p className="text-primary font-medium mb-3">
                    Head of Operations
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Adventure logistics expert passionate about creating
                    seamless and safe expedition experiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <img
                    src="/images/professional-headshot-of-head-of-design.jpg"
                    alt="Head of Design headshot"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    Emily Rodriguez
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    Adventure Curator
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Travel designer focused on crafting unique and authentic
                    adventure experiences worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Adventure Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide every expedition we organize.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3l14 9-14 9V3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Adventure</h3>
                <p className="text-muted-foreground text-sm">
                  Pushing boundaries to discover the extraordinary in every
                  corner of the world.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-violet-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Safety</h3>
                <p className="text-muted-foreground text-sm">
                  Ensuring every adventure is thrilling yet secure with expert
                  guides.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground text-sm">
                  Protecting the environments we explore for future generations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-violet-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground text-sm">
                  Supporting local communities and creating lasting connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Adventure Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from fellow adventurers who've experienced the
                extraordinary.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "The Himalayan trek with Adventour was life-changing. The
                    guides were incredible, the safety measures were top-notch,
                    and the views... absolutely breathtaking. Can't wait for my
                    next adventure!"
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/images/professional-headshot.png"
                      alt="Customer testimonial"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">Alex Thompson</p>
                      <p className="text-sm text-muted-foreground">
                        Himalayan Trek, Nepal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "From booking to the final day, everything was perfectly
                    organized. The Amazon rainforest expedition exceeded all
                    expectations. Adventour truly understands what adventure
                    seekers want."
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/images/professional-headshot.png"
                      alt="Customer testimonial"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">Maria Garcia</p>
                      <p className="text-sm text-muted-foreground">
                        Amazon Expedition, Brazil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're seeking mountain peaks, ocean depths, or cultural
              immersion, we'll help you find your perfect adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Browse Adventures
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent"
              >
                Plan Custom Trip
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
