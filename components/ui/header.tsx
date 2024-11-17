"use client";

import Link from "next/link";
import Logo from "./logo";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "./toaster";
import { Menu } from "lucide-react";

function LinkTab({ name, path }: { name: string, path: string }) {
  return (
    <li>
      <Link href={path} className="btn-md hover:text-indigo-500 transition-colors">
        {name}
      </Link>
    </li>
  );
}

export default function Header() {
  const [user, setUser] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  
  const onSignOut = async () => {
    await fetch("/api/signout");
    // setUser(null);
    router.push("/");
  };
  useEffect(() => {
    fetch("/api/info").then(res => res.json()).then(data => {
      if (data.error) {
        if (user !== null)
          setUser(null);
      }
      else if (!user)
        setUser(data);
    });
  }, [user, pathName]);

  return (
    <header className="z-30 mt-2 w-full md:mt-5 sticky overflow-hidden top-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-row flex-grow">
            <ul className="flex flex-grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8">
              {/* Make dashboard only show if signed in */}
              { user && <LinkTab name="Dashboard" path="/dashboard" /> }
              <LinkTab name="User Info" path="/info" />
              <LinkTab name="Features" path="/features" />
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            {/* Mobile nav button */}
            <div className="flex md:hidden">
              <button className="btn-md" onClick={() => setShowMobileNav(!showMobileNav)}>
                <Menu size={24} />
              </button>
            </div>
            {
              user ? <>
                <li>
                  <Link
                    href="/dashboard"
                    className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onSignOut}
                    className="btn-sm bg-gradient-to-t from-gray-800 to-gray-800 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Sign Out
                  </button>
                </li>
              </> :
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Register
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>
        {/* Mobile navigation */}
        <nav className="md:hidden">
          <div className="flex flex-col items-center list-none *:p-1 *:text-md bg-gray-900/90 transition-all" style={{maxHeight: showMobileNav ? 120 : 0}}>
            {/* Make dashboard only show if signed in */}
            { user && <LinkTab name="Dashboard" path="/dashboard" /> }
            <LinkTab name="User Info" path="/info" />
            <LinkTab name="Features" path="/features" />
          </div>
        </nav>
      </div>
    </header>
  );
}
