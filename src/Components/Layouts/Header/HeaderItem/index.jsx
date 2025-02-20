import { Link, useLocation } from "react-router-dom";

function HeaderItem({ name, Icon, link }) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <Link
      to={link}
      className={`p-2 flex items-center gap-1 text-[16px] font-semibold cursor-pointer 
        ${isActive ? "text-purple-500 hover:text-purple-500" : "text-white hover:text-purple-600"}
      `}
    >
      <Icon className="transition-transform size-4 duration-300 group-hover:scale-125" />
      <div className="relative p-2">
        {name}
        <span
          className={`absolute left-0 bottom-0 w-full h-0.5 bg-purple-500 transition-all duration-300 scale-x-0 group-hover:scale-x-100 
            ${isActive ? "scale-x-100" : ""}
          `}
        />
      </div>
    </Link>
  );
}

export default HeaderItem;
