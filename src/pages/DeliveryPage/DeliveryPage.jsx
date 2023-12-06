import Footer from "./Footer";
import MainSection from "./MainSection";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DeliveryPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <MainSection />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}

export default DeliveryPage;
