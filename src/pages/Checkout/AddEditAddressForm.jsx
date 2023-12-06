import { faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
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

// const position = [42.4634127, 21.4694247];

function AddEditAddressForm({ onClick, from }) {
  const [position, setPosition] = useState([42.4634127, 21.4694247]);
  const [address, setAddress] = useState("");
  const { insertAddress } = useInsertAddress();
  const { user } = useUser();
  const { register, handleSubmit } = useForm();
  const { activeTab } = useSelector((store) => store.activeAddressTab);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
      reverseGeocode(geolocationPosition?.lat, geolocationPosition?.lng).then(
        (address) => {
          if (address && geolocationPosition) {
            setAddress(address);
          } else {
            console.log("Reverse geocoding failed.");
          }
        },
      );
    },
    [geolocationPosition],
  );

  function onSubmit(data) {
    data.address = address || data.address;
    data.type = activeTab;
    data.latitude = String(position[0]);
    data.longitude = String(position[1]);
    insertAddress(data);
    onClick();
  }

  const updateMarkerPosition = (newPosition) => {
    setPosition(newPosition);
  };

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
              defaultValue={address}
              className="w-full rounded-md border border-red-600 px-5 py-2 outline-none"
              {...register("address")}
            />
            <FontAwesomeIcon
              role="button"
              onClick={() => {
                getPosition();
              }}
              icon={faLocationDot}
              className="absolute right-5 top-2 text-2xl text-red-600 hover:cursor-pointer"
            />
          </div>
          <input
            id="houseNumber"
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
            {/* <Marker draggable={true} position={position}></Marker> */}
            <ChangeCenter position={position} />
            {/* <DetectClick onMapDrag={updateMarkerPosition} /> */}
            <Marker draggable={true} position={position}></Marker>
          </MapContainer>
          <input
            id="addressNotes"
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
            defaultValue={user.id}
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
            <AddressType />
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

  map.flyTo(position, 16);

  return null;
}

// function DetectClick({ onMapDrag }) {
//   const map = useMap();
//   // Listen for the map's move event and update the marker's position
//   map.on("move", (e) => {
//     const newPosition = e.target.getCenter();
//     onMapDrag([newPosition.lat, newPosition.lng]);

//     map.setView(newPosition);
//   });

//   return null;
// }

export default AddEditAddressForm;
