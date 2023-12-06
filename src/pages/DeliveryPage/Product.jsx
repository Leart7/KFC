import Modal from "./Modal";
import Overlay from "./Overlay";
import { useCart } from "./useCart";
import { useModalCloser } from "../../customHooks/useModalCloser";

function Product({ product }) {
  const { isLoading, cart: products } = useCart();
  const [clickedModal, setClickedModal] = useModalCloser();

  const prods = products?.filter((prod) => prod.product.id === product.id);
  const cartQuantity = prods?.reduce((acc, cur) => acc + cur.quantity, null);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        role="button"
        onClick={() => setClickedModal(!clickedModal)}
        key={product.id}
        className="relative flex h-[5.5rem] items-center bg-white p-2 hover:cursor-pointer hover:border"
      >
        <img
          src={product.image}
          className="h-auto max-h-full w-auto max-w-full"
          alt={product.name}
        />
        <p className="mb-10 ml-1 font-semibold">{product.name}</p>
        <p className="absolute inset-y-2 left-[93%] text-sm text-red-600">
          {product.price}€
        </p>
        {cartQuantity && (
          <div className="absolute inset-0 h-5 w-5 bg-red-600 text-center text-sm text-white">
            {cartQuantity}
          </div>
        )}
      </div>
      {clickedModal && (
        <>
          <Modal
            product={product}
            onClick={() => setClickedModal(false)}
            from="main"
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default Product;
