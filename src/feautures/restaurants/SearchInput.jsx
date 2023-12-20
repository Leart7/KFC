import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPosition, setQuery } from "../../redux/resQuerySlice";
import { useEffect, useState } from "react";
import { useLocations } from "./useLocations";

function SearchInput({ clicked, setClicked }) {
  const { isLoading, locations } = useLocations();
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.resQuery);
  const { activeIndex } = useSelector((store) => store.activeTab);

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

  useEffect(
    function () {
      setTimeout(() => {
        if (clicked) setClicked(false);
      }, 1);
    },
    [clicked, setClicked],
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="absolute left-28 top-28 z-50 ">
        <input
          type="search"
          placeholder="Search"
          value={query}
          onClick={() => setClicked(false)}
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
          }}
          className={`${
            queryRestaurants.length > 0 && activeIndex !== 1 ? "border-b-0" : ""
          } w-64 rounded-sm border px-10 py-2 text-base font-normal outline-none`}
        />
        <div className="absolute inset-y-0 -left-3 ml-3 flex items-center pl-3 ">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      {queryRestaurants.length > 0 && !clicked && activeIndex === 0 && (
        <div className="absolute left-[7rem] top-[9.5rem] z-50 flex w-[15.92rem] flex-col gap-y-2 bg-white py-2">
          {queryRestaurants.map((res) => (
            <p
              role="button"
              onClick={() => {
                dispatch(setPosition(res.location));
                setClicked(true);
              }}
              key={res.name}
              className="px-5 py-1 hover:cursor-pointer"
            >
              {res.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
