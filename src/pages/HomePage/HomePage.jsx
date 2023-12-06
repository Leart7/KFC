import { useEffect } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import Navbar from "./Navbar";
import UnderMenuSection from "./UnderMenuSection";
import UnderNavbarSection from "./UnderNavbarSection";

function HomePage() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://localhost:7282/api/Lendet/MerrLendenDheStudentet/3",
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/tours");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.data.tours);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
