import LogoButton from "./LogoButton";
// import { handlePost } from "../../services/insertData";

function UnderNavbarSection() {
  // const obj = {
  //   emri: "Dhoma Kater",
  //   kapaciteti: 69,
  // };

  return (
    <>
      <div className="flex items-end justify-between">
        {/* <button onClick={() => handlePost(obj)} className="bg-red-600 p-10">
          INSERT IN DATABASE
        </button> */}
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
