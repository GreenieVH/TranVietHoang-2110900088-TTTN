import React from "react";

function HeaderItem({ name, Icon }) {
  return (
    <div className="text-white flex items-center gap-3 text-[16px] font-semibold cursor-pointer hover:underline underline-offset-8">
      <Icon />
      <div>{name}</div>
    </div>
  );
}

export default HeaderItem;
