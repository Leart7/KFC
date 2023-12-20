import MenuCategories from "./MenuCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../redux/querySlice";
import { useEffect } from "react";
import { setMenu } from "../../redux/deliverySlice";
import { useCategories } from "./useCategories";
import { Link } from "react-router-dom";

function Menu() {
  const { isLoading, categories } = useCategories();
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.query);

  const { activeIndex } = useSelector((store) => store.delivery);

  useEffect(
    function () {
      if (query.trim().length > 1) {
        dispatch(setMenu(""));
      } else {
        dispatch(setMenu("All"));
      }
    },
    [query.length, dispatch, query],
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="mt-8 flex items-center justify-start gap-x-6  border-b pb-3 font-semibold text-red-600">
        <Link
          className={`${activeIndex === "All" ? "ml-3" : ""} ${
            "All" === activeIndex
              ? "underline decoration-[3px] underline-offset-[16px]"
              : ""
          }`}
          role="button"
          onClick={() => dispatch(setMenu("All"))}
        >
          All
        </Link>
        {categories.map((category) => (
          <MenuCategories key={category.name} id={category.name}>
            {category.name}
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
        {(activeIndex === "All" || activeIndex === "") &&
          categories.map((category) => (
            <Products id={category.name} key={category.name}>
              {category.name}
            </Products>
          ))}
        {categories
          .filter((category) => category.name === activeIndex)
          .map((product) => (
            <Products id={product.name} key={product.name}>
              {product.name}
            </Products>
          ))}
      </div>
    </>
  );
}

export default Menu;
