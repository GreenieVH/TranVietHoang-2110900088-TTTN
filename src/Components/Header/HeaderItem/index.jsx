  import React from "react";
  import { Link } from "react-router-dom";

  function HeaderItem({ name, Icon }) {
    const link = `/${name.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <Link to={link} className="text-white flex items-center gap-3 text-[16px] font-semibold cursor-pointer hover:text-purple-700 hover:underline underline-offset-8">
        <Icon />
        <div>{name}</div>
      </Link>
    );
  }

  export default HeaderItem;
