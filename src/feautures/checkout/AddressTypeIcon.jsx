import {
  faAddressCard,
  faBuilding,
  faHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddressTypeIcon({ type }) {
  return (
    <>
      {type === "home" && <FontAwesomeIcon icon={faHome} className="h-4" />}
      {type === "office" && (
        <FontAwesomeIcon icon={faBuilding} className="h-4" />
      )}
      {type === "favorite" && (
        <FontAwesomeIcon icon={faHeart} className="h-4" />
      )}
      {type === "other" && (
        <FontAwesomeIcon icon={faAddressCard} className="h-4" />
      )}
    </>
  );
}

export default AddressTypeIcon;
