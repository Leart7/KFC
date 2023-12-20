import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveIndex } from "../redux/activeNavTabSlice";
import { useUser } from "../feautures/authentication/useUser";

function Footer() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const link = user ? "/delivery" : "/login";

  return (
    <div className={`z-30 mt-auto flex flex-col items-center text-center`}>
      <p className="text-xl font-normal text-stone-700">
        Want to find your nearest KFC?
      </p>
      <p className="text-xl font-normal text-stone-700">Check our Map.</p>
      <div className="mt-5 flex items-center gap-x-5">
        <Link
          onClick={() => dispatch(setActiveIndex(3))}
          to="/restaurants"
          className="bg-red-600 px-6 py-3 text-base font-semibold text-stone-100"
        >
          MAP VIEW
        </Link>
        <Link
          to={link}
          className="bg-red-600 px-6 py-3 text-base font-semibold text-stone-100"
        >
          DELIVERY
        </Link>
      </div>
      <div className="mt-10 flex w-2/3 items-center justify-between">
        <p className="font-normal text-stone-700">© 2022 KFC Kosovo Inc.</p>
        <div className="flex gap-x-8">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="h-8 hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-8 hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faYoutube}
            className="h-8 hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="h-8 w-5 bg-red-600"></div>
        <div className="h-8 w-5 bg-red-600"></div>
        <div className="h-8 w-5 bg-red-600"></div>
      </div>
    </div>
  );
}

export default Footer;
