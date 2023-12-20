import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ListLocation({ location }) {
  return (
    <div
      className={`relative flex h-52 items-center justify-between border-t-[15px] border-stone-100 py-10`}
    >
      <div className="absolute left-0 top-0 h-2 w-4 bg-red-600"></div>
      <div className="absolute left-6 top-0 h-2 w-4 bg-red-600"></div>
      <div className="absolute left-12 top-0 h-2 w-4 bg-red-600"></div>
      <div className=" flex flex-col gap-y-4">
        <h1 className="w-64 text-3xl font-medium">{location.name}</h1>
        <p className="font-medium text-stone-400">{location.city}</p>
      </div>
      <div>
        <p className="text-sm text-stone-400">
          Phone : <span className="text-sm text-red-600">080021212</span>
        </p>
        <p className="text-sm text-stone-400">
          Working Hours :
          <span className="text-sm">
            {" "}
            {location.openingHour} - {location.closingHour}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-x-3 text-stone-400">
        <FontAwesomeIcon icon={faWifi} />
        <FontAwesomeIcon icon={faCheck} />
      </div>
    </div>
  );
}

export default ListLocation;
