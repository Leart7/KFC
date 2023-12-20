import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import MyOrders from "../feautures/confirmOrder/MyOrders";
import Order from "../feautures/confirmOrder/Order";

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
