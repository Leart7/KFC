import { useState } from "react";
import Map from "./Map";
import SearchInput from "./SearchInput";

function MapSearchContainer() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative">
      <Map clicked={clicked} />
      <SearchInput clicked={clicked} setClicked={setClicked} />
    </div>
  );
}

export default MapSearchContainer;
