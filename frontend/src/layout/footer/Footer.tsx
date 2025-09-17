import { MdEmail, MdPhone } from "react-icons/md";
import { FooterList } from "./FooterList";
import Logo from "@/components/Logo";
import { FOOTER_LINKS } from "@/constants/footerLinks";

const Footer = () => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer className="py-18 bg-zinc-900 text-white">
      <div className="main-container grid gap-14 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo + contact*/}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold capitalize tracking-wider mb-4">
            Contact info
          </h4>
          <Logo className="text-white size-30 my-2" />
          <div className="flex items-center gap-2">
            <MdPhone className="size-4 text-primary" />
            <span>+213 0659 58 23 87</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="size-4 text-primary" />
            <span>+213 0552 36 98 52</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <MdEmail className="size-4 text-primary" />
            <span>adventour@gmail.com</span>
          </div>
          <p className="mt-2 text-zinc-400 text-sm font-light">
            &copy; {year} Travel Tour All Rights Reserved.
          </p>
        </div>
        {/* contact list*/}
        <FooterList links={FOOTER_LINKS.aboutUs} title="About US" />
        {/* Support list*/}
        <FooterList links={FOOTER_LINKS.support} title="Support" />
        <div>
          <h4 className="text-sm font-bold capitalize tracking-wider mb-4">
            Pay Safely With Us
          </h4>
          <p className="max-w-64">
            The payment is encrypted and transmitted securely with an SSL
            protocol.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
