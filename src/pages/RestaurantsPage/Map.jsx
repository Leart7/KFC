import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MapList from "./MapList";
import { useLocations } from "./useLocations";

const customIcon = L.icon({
  iconUrl: "/markerIcon.png",
  iconSize: [26, 32],
  iconAnchor: [16, 32],
});

function Map() {
  const { isLoading, locations } = useLocations();
  const { pos } = useSelector((store) => store.resQuery);
  const [position, setPosition] = useState([42.6026, 20.903]);

  useEffect(
    function () {
      if (pos.length > 0) setPosition(pos);
    },
    [pos],
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <MapContainer
        center={position}
        zoom={9}
        scrollWheelZoom={false}
        className="z-10 mx-3 mb-96 mt-20 h-[38rem] "
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.name}
            position={location.location}
            icon={customIcon}
          >
            <Popup className="-ml-1 pb-7">{location.name}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
      </MapContainer>
      <MapList />
    </>
  );
}

function ChangeCenter({ position }) {
  const { locations } = useLocations();

  const map = useMap();
  const location = locations.find((location) => location.location === position);
  map.setView(position);
  if (location) {
    map.flyTo(location.location, 9);
    map.openPopup(location.name, location.location);
  }

  return null;
}

export default Map;
