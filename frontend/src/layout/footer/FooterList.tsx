import { Link } from "react-router-dom";

type FooterListProps = {
  links: {
    label: string;
    href: string;
  }[];
  title: string;
};
export const FooterList = ({ links, title }: FooterListProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold capitalize tracking-wider mb-4">
        {title}
      </h4>
      <ul className=" divide-y divide-gray-50/20 w-52 text-sm">
        {links.map(({ label, href }) => (
          <li key={label + href} className="py-3">
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
