function EmptyCart() {
  return (
    <div className="relative flex-grow border-l">
      <div className="fixed right-0 top-20 flex w-1/4 flex-col items-center justify-center">
        <h1 className="mb-24 text-2xl font-bold uppercase text-red-600">
          Your Order
        </h1>
        <img src="/empty-cart.png" className="w-52" />
        <p className="mt-12 text-xl font-normal text-stone-400">
          Your order is empty.
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
