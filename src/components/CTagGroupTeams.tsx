import React from "react";
import { Props } from "../types/define";

interface ICTagGroupTeams extends Props{
    title: string
}


function CTagGroupTeams({title, children, ...props}: ICTagGroupTeams) {
  return (
    <div style={props.style} className="h-44 w-72 border rounded-xl border-gray-400 flex justify-around items-center flex-wrap">
      <div className="w-full text-center text font-bold text-gray-700">
        {title}
      </div>
      {children}
    </div>
  );
}

export default React.memo(CTagGroupTeams);
