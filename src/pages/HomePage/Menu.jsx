import { useState } from "react";
import MenuCategories from "./MenuCategories";
import ProductOverview from "./ProductOverview";
// import { useSelector } from "react-redux";
import { useHomeCategories } from "./useHomeCategories";
import { useProducts } from "./useProducts";

function Menu() {
  const { isLoading, homeCategories } = useHomeCategories();
  const { isLoading: isLoading1, products } = useProducts();
  const [activeIndex, setActiveIndex] = useState(1);
  // const { shownProducts } = useSelector((store) => store.app);

  function handleClick(index) {
    setActiveIndex(index);
  }

  if (isLoading || isLoading1) return <p>Loading...</p>;

  return (
    <>
      <div className="border-b-2 pb-5">
        <h1 className="my-8 text-4xl font-bold leading-tight text-zinc-800">
          Menu
        </h1>
        <ul className="flex w-full items-center justify-between text-lg font-normal text-neutral-400">
          {homeCategories.map((category) => (
            <MenuCategories
              key={category.id}
              active={category.id === activeIndex}
              onClick={() => handleClick(category.id)}
            >
              {category.category}
            </MenuCategories>
          ))}
        </ul>
      </div>
      <div className="mx-4 mt-10 grid grid-cols-4 gap-y-7">
        {products &&
          products
            .filter((product) => product.homeCategory === activeIndex)
            .map((product) => (
              <ProductOverview
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                id={product.id}
              />
            ))}
        {products &&
        products.filter((product) => product.homeCategory === activeIndex)
          .length === 0 ? (
          <p className="-mt-3 text-sm text-stone-800">Coming Soon</p>
        ) : null}
      </div>
    </>
  );
}

export default Menu;
