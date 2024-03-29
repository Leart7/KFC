function Overlay() {
  return (
    <div
      role="button"
      onClick={(e) => e.preventDefault()}
      id="layer"
      // className="overlay fixed inset-0  z-10  h-[10000px] w-[20000px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg shadow-2xl"
      className="overlay fixed inset-0 z-10 bg-black bg-opacity-50 hover:cursor-auto"
    ></div>
  );
}

export default Overlay;
