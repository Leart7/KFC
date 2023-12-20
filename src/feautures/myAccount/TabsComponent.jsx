import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/activeMyAccountTabSlice";

function TabsComponent() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((store) => store.activeMyAccountTab);

  return (
    <div className=" mt-10 flex w-full items-center justify-between">
      <button
        onClick={() => dispatch(setActiveTab(1))}
        className={`${
          activeTab === 1 ? "border-red-600 text-red-600" : "border-stone-100"
        } flex-1 border border-x-0 border-b-[3px] border-t-0 pb-3 text-base font-medium`}
      >
        Update Profile
      </button>
      <button
        onClick={() => dispatch(setActiveTab(2))}
        className={`${
          activeTab === 2 ? "border-red-600 text-red-600" : "border-stone-100"
        } flex-1 border border-x-0 border-b-[3px] border-t-0  pb-3 text-base font-medium`}
      >
        Saved places
      </button>
      <button
        onClick={() => dispatch(setActiveTab(3))}
        className={`${
          activeTab === 3 ? "border-red-600 text-red-600" : "border-stone-100"
        } flex-1 border border-x-0 border-b-[3px] border-t-0  pb-3 text-base font-medium`}
      >
        My orders
      </button>
    </div>
  );
}

export default TabsComponent;
