import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Home, RefreshCw, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[150px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Payment Failed
            </h1>
          </div>
        </div>
      </section>
      <div className="bg-background flex items-center justify-center py-14">
        <div className="w-full max-w-md space-y-8">
          {/* Error Icon */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-destructive rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-destructive-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Payment Failed
            </h1>
            <p className="text-muted-foreground text-balance">
              We couldn't process your payment. Please check your payment
              details and try again.
            </p>
          </div>

          {/* Common Issues */}
          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Common Issues</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Insufficient funds in your account</li>
                <li>• Incorrect card details or expired card</li>
                <li>• Card blocked by your bank</li>
                <li>• Network connectivity issues</li>
              </ul>
            </CardContent>
          </Card>
          <Link to={"/"}>
            <Button className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>

          {/* Support Info */}
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>
              Still having trouble?{" "}
              <Link to="/" className="text-foreground hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
