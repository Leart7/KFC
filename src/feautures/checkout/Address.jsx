import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import HrLine from "./HrLine";
import { useEffect, useState } from "react";
import Overlay from "../../ui/Overlay";
import AddNewAddress from "./AddNewAddress";
import { useAddresses } from "./useAddresses";
import { useModalCloser } from "../../customHooks/useModalCloser";
import { useActiveAddress } from "../myAccount/useActiveAddress";

const customIcon = L.icon({
  iconUrl: "/homeMarkerIcon.png",
  iconSize: [35, 43],
  iconAnchor: [16, 32],
});

function Address() {
  const [position, setPosition] = useState([42.4634127, 21.4694247]);

  const { addresses } = useAddresses();
  const { activeAddress: activeAdd } = useActiveAddress();

  const activeAddress = addresses?.find((address) => address.id === +activeAdd);

  const [clickedModal, setClickedModal] = useModalCloser();

  useEffect(
    function () {
      if (activeAddress) {
        setPosition([+activeAddress.latitude, +activeAddress.longitude]);
      }
    },
    [activeAddress],
  );

  return (
    <>
      <div className={`relative mt-10 ${clickedModal ? "opacity-90" : ""}  `}>
        <HrLine />
        <label className="absolute -left-[13%] font-medium">Address</label>

        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={false}
          className={`h-[20rem]`}
          dragging={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}></Marker>
          <ChangeCenter position={position} />
        </MapContainer>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className=" font-medium">{activeAddress?.addressName}</p>
        <button
          onClick={() => setClickedModal(true)}
          className="rounded-full border border-red-600 px-3 py-1 text-sm font-medium text-red-600"
        >
          Change
        </button>
      </div>
      <p className="-mt-1 text-xs font-medium capitalize text-stone-400">
        {activeAddress?.type}
      </p>
      {clickedModal && (
        <>
          <AddNewAddress onClick={() => setClickedModal(false)} />
          <Overlay />
        </>
      )}
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  map.flyTo(position, 16);

  return null;
}

export default Address;
