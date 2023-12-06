import { navbarLinks } from "./navbarLinks.js";
import NavbarLink from "./NavbarLink";

function Navbar() {
  return (
    <nav className="mt-4 w-full">
      <div className="flex items-center">
        <p className="text-sm font-semibold uppercase underline hover:cursor-pointer hover:underline-offset-2">
          Work time based on location
        </p>
        <span>
          <svg
            className="mb-1 ml-2 inline"
            height="16"
            viewBox="0 0 48 48"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <path d="M0 0h48v48H0z" fill="none" />
          </svg>
        </span>
      </div>
      <ul className="mt-5 flex w-2/3 items-center gap-x-10 text-lg font-normal uppercase tracking-wide text-stone-800">
        {navbarLinks.map((link) => (
          <NavbarLink key={link.name} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
