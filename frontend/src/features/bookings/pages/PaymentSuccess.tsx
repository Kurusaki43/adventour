import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <section className="-mt-[149px] bg-[url(/images/hero-0-bg.jpg)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black  to-[#334155] opacity-40" />
        <div className="container mx-auto relative z-10 grid place-content-center gap-8 px-2 min-h-[150px]">
          <div className="flex flex-col gap-4 items-center justify-center text-center ">
            <h1 className="text-white font-bold text-[clamp(30px,4vw,54px)] max-w-2xl leading-snug">
              Payment Success
            </h1>
          </div>
        </div>
      </section>
      <div className=" bg-background flex items-center justify-center py-14">
        <div className="w-full max-w-md space-y-8">
          {/* Success Icon */}
          <div className="text-center bg-green-600/20 rounded-xl p-6">
            <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success-foreground" />
            </div>
            <h1 className="text-2xl font-semibold  mb-2">Payment Successful</h1>
            <p className="text-muted-foreground text-balance">
              Your payment has been processed successfully. You should receive a
              confirmation email shortly.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="border border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="text-sm font-mono">#ORD-2024-001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-semibold">$350.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Payment Method
                </span>
                <span className="text-sm">•••• 4242</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/me">
                  My receipt
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
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

export default PaymentSuccess;
