import { useSelector } from "react-redux";
import Footer from "../DeliveryPage/Footer";
import Navbar from "../DeliveryPage/Navbar";
import TabsComponent from "./TabsComponent";
import UpdateProfile from "./UpdateProfile";
import SavedPlaces from "./SavedPlaces";
import Orders from "./Orders";

function MyAccountPage() {
  const { activeTab } = useSelector((store) => store.activeMyAccountTab);

  return (
    <>
      <Navbar />
      <div className="w-full flex-grow bg-stone-50 ">
        <div className="mx-auto mt-10 w-3/4 flex-grow bg-white px-7 py-1">
          <TabsComponent />
          {activeTab === 1 && <UpdateProfile />}
          {activeTab === 2 && <SavedPlaces />}
          {activeTab === 3 && <Orders />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAccountPage;
