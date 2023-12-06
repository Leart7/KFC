import Footer from "../DeliveryPage/Footer";
import Navbar from "../DeliveryPage/Navbar";
import Sidebar from "../DeliveryPage/Sidebar";
import MainSection from "./MainSection";

function CheckoutPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <MainSection />
        <Sidebar from="checkout" />
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;
