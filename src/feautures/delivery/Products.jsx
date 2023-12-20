import { useSelector } from "react-redux";
import Product from "./Product";
import { useEffect, useState } from "react";
import { useProducts } from "../homepage/useProducts";

function Products({ children, id }) {
  const { products } = useProducts();

  const { activeIndex } = useSelector((store) => store.delivery);

  const { query } = useSelector((store) => store.query);

  const [queryProducts, setQueryProducts] = useState([]);

  useEffect(
    function () {
      if (query.trim().length > 1) {
        setQueryProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(query),
          ),
        );
      } else {
        setQueryProducts([]);
      }
    },
    [query, products],
  );

  return (
    <div className="mx-5">
      <h1
        className={`${
          activeIndex !== "All" || query.trim().length > 1 ? "hidden" : ""
        } my-5 text-2xl font-semibold`}
      >
        {children}
      </h1>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 ">
        {queryProducts?.length === 0 && query.trim().length > 1
          ? null
          : queryProducts?.length > 0 && query.trim().length > 1
          ? queryProducts
              .filter((product) => product.category === id)
              .map((product) => <Product key={product.id} product={product} />)
          : products &&
            products
              .filter((product) => product.category === id)
              .map((product) => <Product key={product.id} product={product} />)}
      </div>
    </div>
  );
}

export default Products;
