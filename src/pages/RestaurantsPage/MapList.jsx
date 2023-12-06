import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "./activeTabSlice";

function MapList() {
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((store) => store.activeTab);

  return (
    <div>
      <div className="absolute right-28 top-28 z-50 flex items-center border-2 border-stone-200 bg-white">
        <div
          className={`${
            activeIndex === 0 ? "bg-black text-white" : ""
          } px-7 py-2 text-center hover:cursor-pointer`}
          onClick={() => dispatch(setActiveIndex(0))}
        >
          Map
        </div>
        <div
          className={`${
            activeIndex === 1 ? "bg-black text-white" : ""
          } px-7 py-2 text-center hover:cursor-pointer`}
          onClick={() => dispatch(setActiveIndex(1))}
        >
          List
        </div>
      </div>
    </div>
  );
}

export default MapList;
