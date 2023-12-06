function MoreDropdown({ xPosition, width }) {
  const leftPosition = `${xPosition - width - 40}px`;

  return (
    <div
      style={{ left: leftPosition }}
      className="more-d absolute top-14 z-40 rounded-md border bg-white py-1 text-red-600"
    >
      <ul className="flex flex-col">
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Politikat e Privatësisë
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Terms of Use
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Privacy Policy
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Contact Us
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Help with an order
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer  hover:bg-stone-100">
          Account and Payment Options
        </li>
        <li className="more-d w-full px-3 py-2 hover:cursor-pointer hover:bg-stone-100">
          Guide to Ordering
        </li>
      </ul>
    </div>
  );
}

export default MoreDropdown;
