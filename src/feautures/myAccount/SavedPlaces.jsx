import { useAddresses } from "../checkout/useAddresses";
import { useModalCloser } from "../../customHooks/useModalCloser";
import SavedPlaceLabel from "./SavedPlaceLabel";
import AddEditAddressForm from "../checkout/AddEditAddressForm";
import Overlay from "../../ui/Overlay";

function SavedPlaces() {
  const [clickedModal, setClickedModal] = useModalCloser();

  const { addresses, isLoading } = useAddresses();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={`ms-auto p-7 `}>
        <div className="flex flex-col gap-y-[0.01rem]">
          {addresses.map((address) => (
            <SavedPlaceLabel key={address.id} address={address} />
          ))}
        </div>
        <button
          onClick={() => setClickedModal(true)}
          className="mx-auto mt-7 block w-3/4 rounded-md bg-red-600 px-7 py-2 text-center text-base font-medium uppercase tracking-wide text-white"
        >
          ADD NEW ADDRESS
        </button>
      </div>
      {clickedModal && (
        <>
          <AddEditAddressForm onClick={() => setClickedModal(false)} />
          <Overlay />
        </>
      )}
    </>
  );
}

export default SavedPlaces;
