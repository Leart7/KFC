import { Link } from "react-router-dom";

function ProductOverview({ name, price, image, id }) {
  return (
    <div className="-mt-5 flex flex-col items-center">
      <Link to={`/product/${id}`}>
        <img
          className="w-72 transition-opacity duration-300 hover:cursor-pointer hover:opacity-90"
          src={image}
        />
      </Link>
      <Link
        to={`/product/${id}`}
        className="und text-xl font-medium text-stone-700 hover:cursor-pointer hover:underline hover:underline-offset-[6px]"
      >
        {name}
      </Link>
      <h1 className="mt-3 text-4xl font-extrabold text-red-600">{price}€</h1>
    </div>
  );
}

export default ProductOverview;
