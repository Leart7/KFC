import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import QuantityDropdown from "./QuantityDropdown";

function QuantityButton({ product, from }) {
  const [quantityDropdown, setQuantityDropdown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setQuantityDropdown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(function () {
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#dropdown")) setQuantityDropdown(false);
    });
  }, []);

  return (
    <div
      id="dropdown"
      role="button"
      onClick={() => setQuantityDropdown(!quantityDropdown)}
      className="relative flex items-center gap-x-5"
    >
      <p className="font-semibold text-red-600">{product.quantity} </p>
      {!from && (
        <FontAwesomeIcon
          icon={faAngleDown}
          className="absolute left-7 mt-[0.15rem] text-stone-300"
        />
      )}
      {!from && quantityDropdown && <QuantityDropdown product={product} />}
    </div>
  );
}

export default QuantityButton;
