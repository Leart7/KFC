import Footer from "../ui/Footer";
import MainSection from "../feautures/delivery/MainSection";
import Navbar from "../ui/Navbar";
import Sidebar from "../feautures/delivery/Sidebar";
import { useEffect, useState } from "react";
import { useLocations } from "../feautures/restaurants/useLocations";
import { useActiveAddress } from "../feautures/myAccount/useActiveAddress";
import { calculateDistance } from "../utils/helpers";
import { useAddresses } from "../feautures/checkout/useAddresses";
import { useUpdateKfcLocation } from "../feautures/delivery/useUpdateKfcLocation";
import { useSetActiveAddress } from "../feautures/myAccount/useSetActiveAddress";

function DeliveryPage() {
  const [nearLocations, setNearLocations] = useState([]);
  const { updateKfcLocation } = useUpdateKfcLocation();

  const { addresses } = useAddresses();
  const { locations } = useLocations();
  const { activeAddress } = useActiveAddress();
  const { setAddress } = useSetActiveAddress();

  const address = addresses?.find((address) => address.id === +activeAddress);

  useEffect(() => {
    if (!address) {
      // Handle the case when address is undefined
      return;
    }

    const nearLocationsArray = locations
      ?.map((location) => {
        const distance = calculateDistance(
          address.latitude,
          address.longitude,
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
  }, [locations, addresses, address]);

  const nearestLocation = nearLocations?.sort(
    (a, b) => a.distance - b.distance,
  )[0];

  useEffect(() => {
    if (nearestLocation) {
      updateKfcLocation(nearestLocation?.name);
    }
  }, [nearestLocation, activeAddress, updateKfcLocation]);

  useEffect(
    function () {
      if (activeAddress === null) {
        setAddress(addresses[0]?.id);
      }
    },
    [activeAddress, addresses, setAddress],
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <MainSection />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default DeliveryPage;
