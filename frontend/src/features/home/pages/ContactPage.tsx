import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Contact us
            </h1>
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/20 via-background to-cyan-700/10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-5xl font-bold mb-6 text-balance">
              Ready for Your Next Adventure?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have questions about our tours? Want to plan a custom adventure?
              Our expert team is here to help you create unforgettable memories.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tourType">Tour Interest</Label>
                    <Input
                      id="tourType"
                      placeholder="e.g., Himalayan Trek, Amazon Expedition"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your dream adventure, group size, preferred dates, or any special requirements..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Call Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">+1 (555) ADVENTURE</p>
                    <p className="text-muted-foreground">
                      Available 24/7 for emergencies
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Regular hours: Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <p className="text-muted-foreground">
                        info@adventour.com
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Bookings & Reservations</p>
                      <p className="text-muted-foreground">
                        bookings@adventour.com
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Emergency Support</p>
                      <p className="text-muted-foreground">
                        emergency@adventour.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Visit Our Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">Adventour Headquarters</p>
                    <p className="text-muted-foreground">
                      123 Adventure Boulevard
                      <br />
                      Mountain View, CA 94041
                      <br />
                      United States
                    </p>
                    <Button variant="outline" className="mt-3 bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Book a Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Schedule a free 30-minute consultation to discuss your
                      adventure goals
                    </p>
                    <Button className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about our adventure tours
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How far in advance should I book?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We recommend booking 2-6 months in advance for popular
                    destinations. Last-minute bookings are possible but subject
                    to availability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What's included in tour packages?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most packages include accommodation, meals, professional
                    guides, permits, and equipment. Flights are typically
                    separate unless specified.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Do you offer custom tours?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We specialize in creating personalized adventures tailored
                    to your interests, fitness level, and schedule.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What's your cancellation policy?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cancellation terms vary by tour. Generally, we offer full
                    refunds 60+ days before departure, with sliding scales
                    closer to travel dates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Planning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't wait - your next adventure is just a conversation away
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Adventures
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
