import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddresses } from "./useAddresses";
import AddEditAddressForm from "./AddEditAddressForm";
import { useModalCloser } from "../../customHooks/useModalCloser";
import SavedPlaceLabel from "../myAccount/SavedPlaceLabel";

function AddNewAddress({ onClick }) {
  const { addresses, isLoading } = useAddresses();
  const [clickedModal, setClickedModal] = useModalCloser();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className={`fixed left-1/2 top-[17%] z-40 mt-20 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl`}
      >
        <div className="flex items-center justify-between">
          <h1 className="mb-5 text-2xl font-medium uppercase text-red-600">
            Saved places
          </h1>
          <FontAwesomeIcon
            role="button"
            type="button"
            onClick={onClick}
            icon={faXmark}
            className="text-3xl text-stone-300"
          />
        </div>

        <div className="flex flex-col gap-y-[0.01rem]">
          {addresses.map((address) => (
            <SavedPlaceLabel
              closeNavbarModal={onClick}
              from="navbar"
              key={address.id}
              address={address}
            />
          ))}
        </div>
        <button
          onClick={() => setClickedModal(true)}
          className="mx-auto mt-7 block rounded-md bg-red-600 px-7 py-2 text-center text-base font-medium uppercase tracking-wide text-white"
        >
          ADD NEW ADDRESS
        </button>
      </div>
      {clickedModal && (
        <>
          <AddEditAddressForm
            from="navbar"
            closeNavbarModal={onClick}
            onClick={() => setClickedModal(false)}
          />
        </>
      )}
    </>
  );
}

export default AddNewAddress;
