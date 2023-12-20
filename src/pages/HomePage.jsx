import Footer from "../ui/HomePageFooter";
import Menu from "../feautures/homepage/Menu";
import Navbar from "../ui/HomePageNavbar";
import UnderMenuSection from "../feautures/homepage/UnderMenuSection";
import UnderNavbarSection from "../feautures/homepage/UnderNavbarSection";

function HomePage() {
  return (
    <div className="mx-auto h-screen w-3/4 ">
      <Navbar />
      <UnderNavbarSection />
      <Menu />
      <UnderMenuSection />
      <Footer />
    </div>
  );
}

export default HomePage;
