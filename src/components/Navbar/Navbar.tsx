import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className=" bg-slate-300 h-12 flex justify-evenly ">
      <Button variant="outline">
        <Link href="/auth">Auth</Link>
      </Button>
      <Button variant="outline">
        <Link href="/tracker">Tracker</Link>
      </Button>
      <Button variant="outline">
        <Link href="/chat">Chat</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
