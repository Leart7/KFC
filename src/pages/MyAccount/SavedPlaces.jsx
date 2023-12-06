import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useAddresses } from "../Checkout/useAddresses";
import { useDeleteAddress } from "../Checkout/useDeleteAddress";
import { useUpdateAddress } from "../Checkout/useUpdateAddress";
import AddressTypeIcon from "../Checkout/AddressTypeIcon";
import { useModalCloser } from "../../customHooks/useModalCloser";
import AddEditAddressForm from "../Checkout/AddEditAddressForm";

function SavedPlaces({ onClick }) {
  const [clickedModal, setClickedModal] = useModalCloser();
  const [editMode, setEditMode] = useState(false);

  const { addresses, isLoading } = useAddresses();
  const { deleteAddress } = useDeleteAddress();
  const { updateAddress } = useUpdateAddress();

  const activeAddress = addresses?.find((address) => address?.active === true);

  const inActiveAddresses = addresses?.find(
    (address) => address?.active === false,
  )?.id;

  const [isChecked, setIsChecked] = useState(
    activeAddress ? activeAddress.id : null,
  );

  useEffect(() => {
    if (activeAddress) {
      setIsChecked(activeAddress.id);
    }
  }, [activeAddress]);

  useEffect(
    function () {
      if (!clickedModal) setEditMode(false);
    },
    [clickedModal],
  );

  if (isLoading) return <p>Loading...</p>;

  const handleAddressChange = (newActiveId) => {
    if (newActiveId === activeAddress.id || newActiveId === isChecked) return;

    // Deactivate the currently active address
    if (activeAddress && activeAddress.id !== newActiveId) {
      updateAddress({ id: activeAddress.id, active: false });
    }

    // Set the new address as active
    setIsChecked(newActiveId);
    updateAddress(
      { id: newActiveId, active: true },
      { onSuccess: () => onClick() },
    );
    toast.success("Address changed");
  };

  return (
    <>
      <div className={`ms-auto p-7 `}>
        <div className="flex flex-col gap-y-[0.01rem]">
          {addresses.map((address) => (
            <label
              key={address.id}
              htmlFor={`address${address.id}`}
              className="hover:cursor-pointer"
            >
              <div className="flex w-full items-center justify-between rounded-md border border-stone-300 px-5 py-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id={`address${address.id}`}
                    type="checkbox"
                    checked={address.id === isChecked}
                    onChange={() => {
                      handleAddressChange(address.id);
                    }}
                  />
                  <AddressTypeIcon type={`${address.type}`} />
                  <label className="hover:cursor-pointer">
                    {address.address}
                  </label>
                </div>

                <div
                  role="button"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-x-3"
                >
                  <FontAwesomeIcon
                    role="button"
                    onClick={() => {
                      setEditMode(true);
                      setClickedModal(true);
                    }}
                    icon={faPenToSquare}
                    className=" text-stone-600 hover:text-red-600"
                  />

                  {address.id !== activeAddress.id && (
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
                  {!editMode ? (
                    <AddEditAddressForm
                      onClick={() => setClickedModal(false)}
                    />
                  ) : (
                    <AddEditAddressForm
                      from="edit"
                      address={address}
                      onClick={() => setClickedModal(false)}
                    />
                  )}
                  {/* <Overlay /> */}
                </>
              )}
            </label>
          ))}
        </div>
        <button
          onClick={() => setClickedModal(true)}
          className="mx-auto mt-7 block rounded-md bg-red-600 px-7 py-2 text-center text-base font-medium uppercase tracking-wide text-white"
        >
          ADD NEW ADDRESS
        </button>
      </div>
    </>
  );
}

export default SavedPlaces;
