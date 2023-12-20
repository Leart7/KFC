import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../ui/Navbar";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useModalCloser } from "../customHooks/useModalCloser";
import Overlay from "../ui/Overlay";
import AddEditAddressForm from "../feautures/checkout/AddEditAddressForm";
import { useLocations } from "../feautures/restaurants/useLocations";
import { useEffect, useRef } from "react";

function DeliveryHomePage() {
  const [clickedModal, setClickedModal] = useModalCloser();
  const { isLoading, locations } = useLocations();
  const input = useRef();

  useEffect(
    function () {
      if (!clickedModal) input.current.blur();
    },
    [clickedModal],
  );

  return (
    <>
      <Navbar />
      <div className="mx-auto flex w-[35%] flex-col items-center gap-y-40">
        <img className="mt-20" src="/kfc-logo-D865DEC31A-seeklogo.com.png" />
        <div className="relative flex w-full flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="absolute inset-0 left-5 top-4 text-xl text-red-600"
          />
          <input
            ref={input}
            onFocus={() => setClickedModal(true)}
            className="w-full rounded-md border border-red-600 px-16 py-3 text-lg font-medium outline-none"
            placeholder="Address or Zip Code"
          />
          <button className="rounded-md bg-red-600 px-5 py-3 font-bold text-white">
            FIND BUSINESS
          </button>
        </div>
      </div>
      {clickedModal && (
        <>
          <AddEditAddressForm
            onClick={() => setClickedModal(false)}
            from="deliveryHome"
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default DeliveryHomePage;
