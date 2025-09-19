import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Here are answers to some of the most common questions about our tours
        and booking process.
      </p>

      <Accordion type="single" collapsible className="space-y-4 mb-2">
        <AccordionItem value="item-1" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            How do I book a tour?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            You can browse available tours, select your preferred date, and
            complete the booking process online. Choose between paying securely
            with Stripe or paying in cash on arrival.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            We accept both online payments via Stripe (credit/debit cards) and
            cash payments upon arrival.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            Can I cancel or reschedule my booking?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Yes! Cancellations made at least 7 days before the tour date are
            eligible for a full refund. For rescheduling, please contact our
            support team as soon as possible.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            What happens if the tour is cancelled by Adventour?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            In the rare event we cancel a tour due to weather or unforeseen
            circumstances, you will receive a full refund or the option to
            reschedule at no extra cost.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-medium">
            Do I need travel insurance?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            While not mandatory, we highly recommend purchasing travel insurance
            to cover unexpected events, such as flight delays, health issues, or
            trip cancellations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
