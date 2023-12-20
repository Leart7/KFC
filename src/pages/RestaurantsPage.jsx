import { useSelector } from "react-redux";
import Footer from "../ui/HomePageFooter";
import LogoButton from "../feautures/homepage/LogoButton";
import Navbar from "../ui/HomePageNavbar";
import List from "../feautures/restaurants/List";
import MapSearchContainer from "../feautures/restaurants/MapSearchContainer";

function RestaurantsPage() {
  const { activeIndex } = useSelector((store) => store.activeTab);

  return (
    <>
      <div className="mx-auto w-3/4">
        <Navbar />
        <div className="flex items-end justify-between">
          <h1 className="mt-20 text-7xl font-bold leading-tight text-zinc-800">
            Find our Restaurants <br /> based on location
          </h1>
          <LogoButton />
        </div>
      </div>
      {activeIndex === 0 && <MapSearchContainer />}
      {activeIndex === 1 && <List />}
      <hr className={`mx-auto -mt-64 mb-10 w-3/4 bg-neutral-400`}></hr>
      <Footer />
    </>
  );
}

export default RestaurantsPage;
