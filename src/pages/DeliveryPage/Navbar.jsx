import { Link } from "react-router-dom";
import {
  faHome,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MoreDropdown from "./MoreDropdown";
import { useLogout } from "../authentication/useLogout";
import { useUser } from "../authentication/useUser";
import { useCart } from "../DeliveryPage/useCart";
import { useAddresses } from "../Checkout/useAddresses";
import AddNewAddress from "../Checkout/AddNewAddress";
import Overlay from "./Overlay";
import { useModalCloser } from "../../customHooks/useModalCloser";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../MyAccount/activeMyAccountTabSlice";

function Navbar() {
  const { user } = useUser();
  const { logout } = useLogout();
  const { cart: products } = useCart();
  const [clickedModal, setClickedModal] = useModalCloser();
  const { addresses } = useAddresses();
  const activeAddress = addresses?.find((address) => address?.active === true);

  const numProducts = products?.reduce((acc, cur) => acc + cur.quantity, 0);

  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  const [xPosition, setXPosition] = useState(null);
  const [width, setWidth] = useState(null);

  function handleClick(e) {
    const { x: xPos, width: elWidth } = e.target
      .closest("#more-d")
      .getBoundingClientRect();
    setClicked(!clicked);
    setXPosition(xPos);
    setWidth(elWidth);
  }

  useEffect(function () {
    document.addEventListener("click", function (e) {
      if (!e.target.className.includes("more-d")) {
        setClicked(false);
      }
    });
    return () =>
      document.removeEventListener("click", function (e) {
        if (!e.target.className.includes("more-d")) setClicked(false);
      });
  });

  return (
    <nav className="flex h-16 w-full items-center justify-end border-b pr-10">
      <Link
        to="/"
        className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>
      <Link
        onClick={handleClick}
        id="more-d"
        className={`${
          clicked ? "bg-stone-200 " : ""
        } more-d flex h-full items-center gap-x-1 px-5 font-bold uppercase text-red-600`}
      >
        More <FontAwesomeIcon className="moreicon" icon={faCaretDown} />
      </Link>
      {clicked && <MoreDropdown xPosition={xPosition} width={width} />}
      {user && (
        <>
          <Link
            role="button"
            onClick={() => dispatch(setActiveTab(1))}
            to="/profile"
            className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
          >
            <FontAwesomeIcon icon={faUser} /> My Account
          </Link>

          {activeAddress ? (
            <Link
              role="button"
              onClick={() => setClickedModal(true)}
              className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
            >
              <FontAwesomeIcon icon={faAddressBook} />
              {activeAddress.address.length >= 11
                ? `${activeAddress.address.split("").slice(0, 12).join("")}...`
                : activeAddress.address}
            </Link>
          ) : (
            "Gjilan"
          )}
          {clickedModal && (
            <>
              <AddNewAddress onClick={() => setClickedModal(false)} />
              <Overlay />
            </>
          )}
          <Link
            className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
            role="button"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faPowerOff} />
            Logout
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link
            className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
            to="/login"
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            Login
          </Link>
          <Link
            className="flex h-full items-center gap-x-1 px-5 uppercase text-red-600"
            to="/signup"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Sign up
          </Link>
        </>
      )}
      <Link
        to="/delivery"
        className={`${
          numProducts > 0 ? "bg-red-600 text-white" : ""
        } rounded-lg border border-red-600 px-5 py-2 font-bold uppercase text-red-600`}
      >
        <FontAwesomeIcon icon={faBagShopping} className="mr-1 text-xl" />{" "}
        {numProducts}
      </Link>
      <Link to="/" className="px-5 font-bold uppercase text-red-600">
        En <FontAwesomeIcon icon={faCaretDown} />
      </Link>
    </nav>
  );
}

export default Navbar;
