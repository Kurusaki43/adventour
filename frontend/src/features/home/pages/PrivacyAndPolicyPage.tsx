export default function PrivacyPolicy() {
  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[350px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We respect your privacy and are committed to protecting your
                  personal data. This privacy policy explains how we collect,
                  use, and safeguard your information when you use our service.
                </p>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Information We Collect
                </h2>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-foreground">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may collect personal information that you provide
                    directly to us, such as:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-foreground">
                    Usage Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect certain information about your use
                    of our service:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and preferences</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Provide and maintain our service</li>
                  <li>Process transactions and send notifications</li>
                  <li>Improve our service and develop new features</li>
                  <li>Communicate with you about updates and support</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>
                    With trusted service providers who assist our operations
                  </li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure.
                </p>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance
                  your experience on our service. You can control cookie
                  settings through your browser preferences, though some
                  features may not function properly if cookies are disabled.
                </p>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If we become aware that we have collected
                  such information, we will take steps to delete it promptly.
                </p>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the "Last updated" date. Your
                  continued use of our service after such changes constitutes
                  acceptance of the updated policy.
                </p>
              </article>

              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy or our
                  data practices, please contact us at:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">
                    Email: adventour@gmail.com
                    <br />
                    Address: Algiers,Algeria
                    <br />
                    Phone: 0569 85 23 58
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
