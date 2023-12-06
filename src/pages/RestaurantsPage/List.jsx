import MapList from "./MapList";
import SearchInput from "./SearchInput";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListLocation from "./ListLocation";
import { useLocations } from "./useLocations";

function List() {
  const { isLoading, locations } = useLocations();
  const { query } = useSelector((store) => store.resQuery);

  const [queryRestaurants, setQueryRestaurants] = useState([]);

  useEffect(
    function () {
      if (query.trim().length > 1) {
        setQueryRestaurants(
          locations.filter((location) =>
            location.name.toLowerCase().includes(query),
          ),
        );
      } else {
        setQueryRestaurants([]);
      }
    },
    [query, locations],
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="relative mb-96 w-full ">
      <SearchInput />
      <MapList />
      <div className="mx-28 mt-48 flex flex-col">
        {queryRestaurants.length === 0 && query.trim().length > 1
          ? null
          : queryRestaurants.length > 0
          ? queryRestaurants.map((location) => (
              <ListLocation key={location.name} location={location} />
            ))
          : locations.map((location) => (
              <ListLocation key={location.name} location={location} />
            ))}
      </div>
    </div>
  );
}

export default List;
