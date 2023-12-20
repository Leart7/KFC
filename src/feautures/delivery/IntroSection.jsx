import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useKfcLocation } from "./useKfcLocation";

function IntroSection() {
  const { kfcLocation } = useKfcLocation();

  return (
    <div>
      <img src="/prekeqitu.png" className="w-full" />
      <h1 className="text-stone ml-16 mt-3 text-3xl font-bold uppercase">
        {kfcLocation}{" "}
        <sup>
          <FontAwesomeIcon icon={faInfoCircle} />
        </sup>
      </h1>
    </div>
  );
}

export default IntroSection;
