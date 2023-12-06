function MenuCategories({ children, active, onClick }) {
  return (
    <li
      role="button"
      className={`${
        active ? "text-red-600 underline underline-offset-[27px]" : ""
      } hover:cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default MenuCategories;
