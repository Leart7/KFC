import {
  faBuilding,
  faHeart,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "./activeAddressTab";

function AddressType() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");

  return (
    <>
      <div
        role="button"
        onClick={() => {
          setActive("home");
          dispatch(setActiveTab("home"));
        }}
        className={`${
          active === "home" ? "bg-red-600 text-white" : "bg-white text-red-600"
        } flex-1 transform  rounded-sm border border-stone-300 py-3 duration-200 hover:cursor-pointer`}
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          <p className="text-sm">Home</p>
        </div>
      </div>

      <div
        role="button"
        onClick={() => {
          setActive("office");
          dispatch(setActiveTab("office"));
        }}
        className={`${
          active === "office"
            ? "bg-red-600 text-white"
            : "bg-white text-red-600"
        } flex-1 transform rounded-sm border border-stone-300 py-3 duration-200 hover:cursor-pointer`}
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faBuilding} className="text-xl" />
          <p className="text-sm">Office</p>
        </div>
      </div>

      <div
        role="button"
        onClick={() => {
          setActive("favorite");
          dispatch(setActiveTab("favorite"));
        }}
        className={`${
          active === "favorite"
            ? "bg-red-600 text-white"
            : "bg-white text-red-600"
        } flex-1 transform rounded-sm border border-stone-300 py-3 duration-200 hover:cursor-pointer`}
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faHeart} className="text-xl" />
          <p className="text-sm">Favorite</p>
        </div>
      </div>

      <div
        role="button"
        onClick={() => {
          setActive("other");
          dispatch(setActiveTab("other"));
        }}
        className={`${
          active === "other" ? "bg-red-600 text-white" : "bg-white text-red-600"
        } flex-1 transform rounded-sm border border-stone-300 py-3 duration-200 hover:cursor-pointer`}
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
          <p className="text-sm">Other</p>
        </div>
      </div>
    </>
  );
}

export default AddressType;
