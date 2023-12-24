import {
  faCircleXmark,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGeolocation } from "../../customHooks/useGeolocation";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { reverseGeocode } from "../../customHooks/useReverseGeocoding";
import AddressType from "./AddressType";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useInsertAddress } from "./useInsertAddress";
import { useUser } from "../authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useCities } from "../../customHooks/useCities";
import CitiesList from "../../ui/CitiesList";
import { useUpdateAddress } from "./useUpdateAddress";
import { useSetActiveAddress } from "../myAccount/useSetActiveAddress";
import { useAddresses } from "./useAddresses";
import { useLocations } from "../restaurants/useLocations";
import { calculateDistance } from "../../utils/helpers";
import toast from "react-hot-toast";

function AddEditAddressForm({
  onClick,
  from,
  existingAddress,
  closeNavbarModal,
}) {
  const { locations } = useLocations();
  const { cities, error } = useCities();
  const [queryCities, setQueryCities] = useState([]);
  const [clickedCity, setClickedCity] = useState("");
  const [recenter, setRecenter] = useState(false);

  const [position, setPosition] = useState([42.4634127, 21.4694247]);
  const [address, setAddress] = useState("");
  const { insertAddress } = useInsertAddress();
  const { updateAddress } = useUpdateAddress();
  const { user } = useUser();
  const { register, handleSubmit, watch, setValue } = useForm();
  const { activeTab } = useSelector((store) => store.activeAddressTab);
  const navigate = useNavigate();
  const { setAddress: setActiveAddress } = useSetActiveAddress();
  const { addresses } = useAddresses();

  const addressInput = watch("address");

  const { position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(
    function () {
      if (from === "edit") {
        setPosition([existingAddress?.latitude, existingAddress?.longitude]);
        setRecenter(true);
      }
    },
    [existingAddress?.longitude, from, existingAddress?.latitude],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
      reverseGeocode(geolocationPosition?.lat, geolocationPosition?.lng).then(
        (address) => {
          if (address && geolocationPosition) {
            setAddress(address);
            setValue("address", address);
          } else {
            console.log("Reverse geocoding failed.");
          }
        },
      );
    },
    [geolocationPosition],
  );

  useEffect(
    function () {
      if (addressInput?.length !== 0) {
        setQueryCities(
          cities.results
            ?.map((c) => ({
              name: c.name,
              location: c.location,
            }))
            .filter((c) =>
              c.name.toLowerCase().startsWith(addressInput?.toLowerCase()),
            ),
        );
      }
    },
    [cities.results, addressInput],
  );

  useEffect(function () {
    setTimeout(() => {
      if (recenter) setRecenter(false);
    }, 100);
  });

  const handleMarkerDragend = (event) => {
    setPosition([event.target._latlng.lat, event.target._latlng.lng]);
    reverseGeocode(event.target._latlng.lat, event.target._latlng.lng).then(
      (address) => {
        setAddress(address);
        setValue("address", address);
      },
    );
  };

  function onSubmit(data) {
    if (data.address.trim().length === 0) return;
    data.addressName = address || data.address;
    data.type = activeTab;
    data.latitude = String(position[0]);
    data.longitude = String(position[1]);
    data.userId = user.id;

    if (
      !locations?.some((location) => {
        const distance = calculateDistance(
          data.latitude,
          data.longitude,
          location.location[0],
          location.location[1],
        );

        return distance <= 5;
      })
    ) {
      toast.error("No business near this area!");
      return;
    }

    if (from === "edit") {
      updateAddress({
        id: existingAddress.id,
        updateAddressObj: {
          addressName: address || data.address,
          houseNumber: data.houseNumber,
          addressNotes: data.addressNotes,
          type: data.type,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });
    } else {
      insertAddress(data);
      from === "deliveryHome" && navigate(`/search/type/delivery/address`);
    }
    onClick();
    if (from === "navbar") {
      closeNavbarModal();
    }
  }

  return (
    <div className=" fixed left-1/2 top-[40%] z-50 w-[57%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-7 shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <h1 className=" text-2xl font-medium uppercase text-red-600">
          {from === "edit" ? "EDIT ADDRESS" : "ADD ADDRESS"}
        </h1>
        <FontAwesomeIcon
          role="button"
          type="button"
          onClick={onClick}
          icon={faXmark}
          className="text-3xl text-stone-300"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2">
          <div className="relative">
            <input
              id="address"
              placeholder="Address"
              defaultValue={existingAddress?.addressName || clickedCity}
              className="w-full rounded-md border border-red-600 px-5 py-2 outline-none"
              {...register("address")}
            />
            {addressInput?.length > 0 &&
              queryCities?.length > 0 &&
              clickedCity !== addressInput &&
              addressInput !== existingAddress?.addressName && (
                <CitiesList
                  queryCities={queryCities}
                  setClickedCity={setClickedCity}
                  setValue={setValue}
                  setPosition={setPosition}
                  setRecenter={setRecenter}
                />
              )}
            {addressInput?.length > 0 && (
              <FontAwesomeIcon
                role="button"
                onClick={() => {
                  setClickedCity("");
                  setValue("address", "");
                }}
                icon={faCircleXmark}
                className="absolute right-12 top-2 text-2xl text-gray-400 hover:cursor-pointer"
              />
            )}
            <FontAwesomeIcon
              role="button"
              onClick={() => {
                setRecenter(true);
                getPosition();
              }}
              icon={faLocationDot}
              className="absolute right-5 top-2 text-2xl text-red-600 hover:cursor-pointer"
            />
          </div>
          <input
            id="houseNumber"
            defaultValue={existingAddress?.houseNumber}
            placeholder="House number"
            className="w-full rounded-md border border-red-600 px-5 py-2 outline-none"
            {...register("houseNumber")}
          />

          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            className={`h-[15rem]`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {recenter && <ChangeCenter position={position} />}
            <Marker
              draggable={true}
              position={position}
              eventHandlers={{
                dragend: handleMarkerDragend,
              }}
            ></Marker>
          </MapContainer>
          <input
            id="addressNotes"
            defaultValue={existingAddress?.addressNotes}
            placeholder="Address notes"
            className="w-full rounded-md border border-red-600 px-5 py-2 outline-none"
            {...register("addressNotes")}
          />
          <input
            id="type"
            type="hidden"
            value={activeTab}
            {...register("type")}
          />
          <input
            id="user"
            type="hidden"
            defaultValue={user?.id}
            {...register("user")}
          />
          <input
            id="latitude"
            type="hidden"
            defaultValue={position[0]}
            {...register("latitude")}
          />
          <input
            id="longitude"
            type="hidden"
            defaultValue={position[1]}
            {...register("longitude")}
          />
          <div className="flex flex-row items-center gap-x-[0.1rem]">
            <AddressType existingAddressType={existingAddress?.type} />
          </div>
          <button
            type="submit"
            className="mx-auto mt-3 block rounded-sm bg-red-600 px-7 py-2 font-medium text-white"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  map.flyTo(position, 15);

  return null;
}

export default AddEditAddressForm;
