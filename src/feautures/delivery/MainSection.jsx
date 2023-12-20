import IntroSection from "./IntroSection";
import Menu from "./Menu";

function MainSection() {
  return (
    <div className="flex w-3/4 flex-col ">
      <IntroSection />
      <Menu />
    </div>
  );
}

export default MainSection;
