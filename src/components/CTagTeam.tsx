import React from "react";
import imgPOR from "../assets/flags/por-flag.png";
import { Props } from "../types/define";

interface ICTagTeam extends Props {
  name: string;
  titleOutSize?: string;
  urlFlag?: string
}

function CTagTeam({ name, titleOutSize, urlFlag, ...props }: ICTagTeam) {
  console.log(urlFlag);
  
  return (
    <div className={props?.className}>
      {titleOutSize && (
        <div
          style={{ fontSize: "10px" }}
          className="h-4 mt-1 text-center text-sm text-gray-400 font-bold"
        >
          1A
        </div>
      )}
      <div className="h-14 w-32 border rounded-lg border-gray-400 flex justify-around items-center bg-white">
        <span
          className={`h-9 w-16 flex items-center ${
            !urlFlag ? " bg-gray-300 border rounded-lg border-gray-400" : ""
          }`}
        >
          <img className="h-9 w-16" src={urlFlag} alt={name} />
        </span>
        <span className="text font-bold">{name}</span>
      </div>
    </div>
  );
}

export default React.memo(CTagTeam);
