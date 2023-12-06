import Footer from "../DeliveryPage/Footer";
import Navbar from "../DeliveryPage/Navbar";
import MyOrders from "./MyOrders";
import Order from "./Order";

function ConfirmOrderPage() {
  return (
    <>
      <Navbar />
      <img src="orderConfirmed.png" className="-mt-1" />
      <MyOrders />
      <div className="flex flex-grow">
        <Order />
      </div>
      <Footer />
    </>
  );
}

export default ConfirmOrderPage;
