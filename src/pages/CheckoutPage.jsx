import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import Sidebar from "../feautures/delivery/Sidebar";
import MainSection from "../feautures/checkout/MainSection";

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
