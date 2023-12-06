import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAddresses } from "./useAddresses";
import { useDeleteAddress } from "./useDeleteAddress";
import AddEditAddressForm from "./AddEditAddressForm";
import { useUpdateAddress } from "./useUpdateAddress";
import AddressTypeIcon from "./AddressTypeIcon";
import toast from "react-hot-toast";
import { useModalCloser } from "../../customHooks/useModalCloser";

function AddNewAddress({ onClick }) {
  const { addresses, isLoading } = useAddresses();
  const { deleteAddress } = useDeleteAddress();
  const { updateAddress } = useUpdateAddress();

  const [clickedModal, setClickedModal] = useModalCloser();

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
      {!clickedModal && (
        <div
          className={`fixed left-1/2 top-[17%] z-40 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl`}
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
      )}
      {clickedModal && (
        <>
          <AddEditAddressForm onClick={() => setClickedModal(false)} />
          {/* <Overlay /> */}
        </>
      )}
    </>
  );
}

export default AddNewAddress;
