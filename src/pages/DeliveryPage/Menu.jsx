import MenuCategories from "./MenuCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "./querySlice";
import { useEffect } from "react";
import { setMenu } from "./deliverySlice";
import { useCategories } from "./useCategories";

function Menu() {
  const { isLoading, categories } = useCategories();
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.query);

  const { activeIndex } = useSelector((store) => store.delivery);

  useEffect(
    function () {
      if (query.trim().length > 1) {
        dispatch(setMenu(0));
      } else {
        dispatch(setMenu(1));
      }
    },
    [query.length, dispatch, query],
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="mt-8 flex items-center justify-start gap-x-6  border-b pb-3 font-semibold text-red-600">
        {categories.map((category) => (
          <MenuCategories key={category.id} id={category.id}>
            {category.category}
          </MenuCategories>
        ))}
      </div>
      <div className="relative w-full border-b p-3">
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-sm border  px-10 py-1 text-base font-normal outline-none"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        <div className="absolute inset-y-0 left-0 ml-3 flex items-center pl-3 text-stone-400">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className="flex-1 bg-stone-50 py-7">
        {(activeIndex === 1 || activeIndex === 0) &&
          categories.map((category) => (
            <Products id={category.id} key={category.id}>
              {category.category}
            </Products>
          ))}
        {categories
          .filter((category) => category.id === activeIndex)
          .map((product) => (
            <Products id={product.id} key={product.id}>
              {product.category}
            </Products>
          ))}
      </div>
    </>
  );
}

export default Menu;
