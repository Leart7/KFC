import { Link } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LogoButton from "../HomePage/LogoButton";
import Footer from "../HomePage/Footer";
import { useProduct } from "./useProduct";

function Product() {
  const { isLoading, product } = useProduct();

  if (isLoading) return <p>Loading...</p>;

  console.log(product);

  return (
    <div className="mx-auto h-screen w-3/4">
      <Navbar />
      <div className="flex items-end justify-between">
        <h1 className="invisible mt-20 text-7xl font-bold leading-tight text-zinc-800">
          The right way to <br /> do chicken
        </h1>
        <LogoButton />
      </div>
      <div className="flex items-start gap-x-16">
        <div className="-mt-40 h-[38rem] w-[38rem] overflow-hidden rounded-md border-4 border-neutral-200">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="relative left-[93%] top-3"
          />
          <img src={product.image} />
        </div>
        <div className="flex flex-col items-start gap-y-8">
          <h1 className="text-5xl font-extrabold text-stone-900">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-red-600">
            {product.price}€
          </p>
          <p className="-mt-6 font-medium text-neutral-400">
            {product.ingredients}
          </p>
          <Link
            to="/"
            className="font-extrabold text-red-600 hover:underline hover:underline-offset-2"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
      <div>
        <p className="mt-16 font-normal text-stone-950 underline underline-offset-[34px] hover:cursor-pointer">
          Description
        </p>
        <hr className="my-12 mt-7 w-full bg-neutral-400"></hr>
      </div>
      <p className="text-xl font-bold text-stone-950">Description</p>
      <p className="mt-8 text-sm font-normal text-stone-950">
        {product.ingredients}
      </p>
      <hr className="my-12 mb-52 w-full bg-neutral-400"></hr>
      <Footer />
    </div>
  );
}

export default Product;
