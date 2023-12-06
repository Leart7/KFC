import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto bg-red-600 px-10">
      <div className="flex items-center justify-between text-lg text-stone-200">
        <img src="/footer-logo.png" className="w-24" />
        <Link className="hover:underline hover:underline-offset-2">
          Privacy Policy
        </Link>
        <Link className="hover:underline hover:underline-offset-2">
          Terms of use
        </Link>
        <Link className="hover:underline hover:underline-offset-2">
          Contact us
        </Link>
        <div className="mr-24 flex items-center gap-x-3 text-xl">
          <Link>
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link>
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
        </div>
      </div>
      <p className="pb-2 text-center text-white">
        © Copyright 2021 - KFC KOSOVA - All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
