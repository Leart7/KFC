import { useState } from "react";
import axios from "axios";

export function useDistance() {
  const [distance, setDistance] = useState(null);

  async function getDistance(origin, destination) {
    try {
      const originResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${origin}&limit=1`,
      );
      const originData = originResponse.data[0];

      const destinationResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}&limit=1`,
      );
      const destinationData = destinationResponse.data[0];

      const R = 6371;
      const dLat = (destinationData.lat - originData.lat) * (Math.PI / 180);
      const dLon = (destinationData.lon - originData.lon) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(originData.lat * (Math.PI / 180)) *
          Math.cos(destinationData.lat * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const calculatedDistance = R * c;

      setDistance(calculatedDistance.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return { distance, getDistance };
}
