import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressTypeIcon from "../checkout/AddressTypeIcon";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddEditAddressForm from "../checkout/AddEditAddressForm";
import Overlay from "../../ui/Overlay";
import { useSetActiveAddress } from "./useSetActiveAddress";
import { useActiveAddress } from "./useActiveAddress";
import { useModalCloser } from "../../customHooks/useModalCloser";
import { useDeleteAddress } from "../checkout/useDeleteAddress";

function SavedPlaceLabel({ address, from, closeNavbarModal }) {
  const { activeAddress } = useActiveAddress();
  const { setAddress } = useSetActiveAddress();
  const [clickedModal, setClickedModal] = useModalCloser();
  const { deleteAddress } = useDeleteAddress();

  return (
    <label
      key={address.id}
      htmlFor={`address${address.id}`}
      className="hover:cursor-pointer "
    >
      <div className="flex w-full items-center justify-between rounded-md border border-stone-300 px-5 py-2">
        <div className="flex items-center gap-x-3">
          <input
            id={`address${address.id}`}
            type="checkbox"
            checked={address.id === +activeAddress}
            onChange={() => {
              if (address.id !== +activeAddress) {
                setAddress(address.id);
              }
              if (from === "navbar") {
                closeNavbarModal();
              }
            }}
          />
          <AddressTypeIcon type={`${address.type}`} />
          <p className="hover:cursor-pointer">{address.addressName}</p>
        </div>

        <div
          role="button"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-x-3"
        >
          <FontAwesomeIcon
            role="button"
            onClick={() => {
              setClickedModal(true);
            }}
            icon={faPenToSquare}
            className=" text-stone-600 hover:text-red-600"
          />

          {address.id !== +activeAddress && (
            <FontAwesomeIcon
              role="button"
              onClick={(e) => {
                e.preventDefault();
                deleteAddress(address.id);
              }}
              icon={faTrash}
              className=" text-stone-600 hover:cursor-pointer hover:text-red-600"
            />
          )}
        </div>
      </div>
      {clickedModal && (
        <>
          <AddEditAddressForm
            from="edit"
            closeNavbarModal={closeNavbarModal}
            existingAddress={address}
            onClick={() => setClickedModal(false)}
          />
          <Overlay />
        </>
      )}
    </label>
  );
}

export default SavedPlaceLabel;
