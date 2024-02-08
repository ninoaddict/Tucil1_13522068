"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { orbitron } from "./font";

const links = [
  { name: "Home", href: "/" },
  { name: "How To Use", href: "/how-to-use" },
  { name: "About", href: "/about" },
];

export default function NavLinks() {
  const pathName = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <li
            key={link.name}
            className={`list-none text-xl font-semibold ${orbitron.className}`}
          >
            <Link
              href={link.href}
              className={clsx(
                "lg:duration-300 lg:ease-in-out text-onBackground hover:text-primary active:text-primary",
                { "text-primary": pathName === link.href }
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
