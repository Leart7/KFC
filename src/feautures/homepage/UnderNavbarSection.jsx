import LogoButton from "./LogoButton";

function UnderNavbarSection() {
  return (
    <>
      <div className="flex items-end justify-between">
        <h1 className="mt-20 text-7xl font-bold leading-tight text-zinc-800">
          The right way to <br /> do chicken
        </h1>
        <LogoButton />
      </div>
      <div className="mt-10 flex items-center">
        <img className="w-1/2" src="/twisterPoster.jpg" />
        <img className="w-1/2" src="/mbushjePoster.jpg" />
      </div>
    </>
  );
}

export default UnderNavbarSection;
