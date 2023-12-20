function CitiesList({
  queryCities,
  setClickedCity,
  setValue,
  setPosition,
  setRecenter,
}) {
  return (
    <div className={`absolute inset-0 top-10 z-[100000000] w-full`}>
      <ul className=" flex flex-col rounded-md border bg-white py-2 text-sm font-normal shadow-md">
        {queryCities?.slice(0, 5).map((city) => (
          <li
            key={city.name}
            role="button"
            onClick={(e) => {
              setClickedCity(city.name);
              setValue("address", city.name);
              setPosition([city.location.latitude, city.location.longitude]);
              setRecenter(true);
              e.stopPropagation();
            }}
            className={` flex w-full items-center gap-x-4  px-7 py-4 hover:cursor-pointer hover:bg-stone-100`}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitiesList;
