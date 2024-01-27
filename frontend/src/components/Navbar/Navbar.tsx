import Link from "next/link";
import React from "react";

import { AlignJustify, X } from "lucide-react";

const navigation = [
  { name: "Auth", href: "/auth", current: false },
  { name: "Tracker", href: "/tracker", current: false },
  { name: "Chat", href: "/chat", current: false },
];

function classNames(...classes: [string]) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  return (
    <div className="mx-auto  px-2 sm:px-6 lg:px-8 bg-gray-700">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch">
          <div className="flex flex-shrink-0 items-center"></div>
          <div className="sm:ml-6 ">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    // "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
      </div>
    </div>
  );
}

export default Navbar;
