import { useSelector } from "react-redux";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import TabsComponent from "../feautures/myAccount/TabsComponent";
import UpdateProfile from "../feautures/myAccount/UpdateProfile";
import SavedPlaces from "../feautures/myAccount/SavedPlaces";
import Orders from "../feautures/myAccount/Orders";

function MyAccountPage() {
  const { activeTab } = useSelector((store) => store.activeMyAccountTab);

  return (
    <>
      <Navbar />
      <div className="w-full flex-grow bg-stone-50 ">
        <div className="mx-auto my-10 w-3/4 flex-grow bg-white px-7 py-1">
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
