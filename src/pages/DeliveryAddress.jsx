import { useEffect, useState } from "react";
import { useLocations } from "../feautures/restaurants/useLocations";
import Navbar from "../ui/Navbar";
import { calculateDistance } from "../utils/helpers";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAddresses } from "../feautures/checkout/useAddresses";

function DeliveryAddress() {
  const navigate = useNavigate();
  const { isLoading, locations } = useLocations();
  const [nearLocations, setNearLocations] = useState([]);
  const { addresses } = useAddresses();

  useEffect(() => {
    const nearLocationsArray = locations
      ?.map((location) => {
        const distance = calculateDistance(
          addresses[addresses?.length - 1]?.latitude,
          addresses[addresses?.length - 1]?.longitude,
          location.location[0],
          location.location[1],
        );

        return {
          ...location,
          distance,
        };
      })
      .filter((location) => location.distance <= 5);

    setNearLocations(nearLocationsArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, addresses]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <p className="mx-5 border-b py-3">
        {nearLocations?.length} Businesses found near{" "}
        {addresses[addresses?.length - 1]?.addressName}
      </p>
      <div className="mx-5 mt-5 flex gap-x-7">
        {nearLocations?.map((location) => (
          <div
            role="button"
            onClick={() => {
              navigate("/delivery");
              localStorage.setItem("kfcLocation", location.name);
            }}
            key={location.name}
            className="flex w-1/4 flex-col rounded-md pb-5 hover:cursor-pointer hover:border"
          >
            <img src="/prekeqitu.png" className="mb-3" />
            <div className="ms-3">
              <p className=" text-xl font-bold">{location.name}</p>
              <p className="my-2 text-sm">
                {location.openingHour} - {location.closingHour}
              </p>
              <p className=" text-sm">
                <span className="font-bold">Minimum Order:</span> 5.00 €
              </p>
              <p className=" text-sm">
                <span className="font-bold">Delivery Fee:</span> 1.00 €
              </p>
              <p className=" text-sm">
                <span className="font-bold">Description:</span>
              </p>
              <p className=" text-sm">
                <span className="font-bold">Distance:</span>{" "}
                {location.distance.toFixed(2)} KM
              </p>
              <p className=" text-sm">
                <span className="font-bold">Delivery time:</span> 00:30
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeliveryAddress;
