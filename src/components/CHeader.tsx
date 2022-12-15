import { Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

type INav = "home" | "hxh" | "tips";

function CHeader({}: Props) {
  const navigate = useNavigate();
  // const location = useLocation();
  const objLang = ["en", "vi"];
  const lang = "en";

  // console.log(location.pathname.split("/"));

  return (
    <header className="">
      <div className="h-14 bg-[#2a3038] flex items-center px-6">
        <div
          onClick={() => navigate("/")}
          className="font-bold text-xl select-none cursor-pointer"
        >
          <span className=" text-white">Sport</span>
          <span className="text-[#3fa338]">Info</span>
        </div>
      </div>
      <div className="h-14 bg-[#05b244] flex items-center justify-between px-6">
        <div className="bg-[linear-gradient(180deg,#04a941,#059b3d)] h-14 flex items-center font-bold text-lg px-3 cursor-pointer">
          <span onClick={() => navigate("/")} className=" text-white">
            Football
          </span>
        </div>
        <div className="">
          <Dropdown
            inline={true}
            label={lang.toUpperCase()}
            dismissOnClick={false}
          >
            {objLang.map((e: string, i: number) => (
              <Dropdown.Item key={i}>{e}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
      <div className="shadow-md h-11 flex items-center px-6 text-xl divide-x bg-white">
        <div className="px-2 h-full text-center flex items-center border border-l-1 border-r-transparent hover:text-[#3fa338]">
          <Link to="/home">Home</Link>
        </div>
        <div className=" px-2 h-full text-center flex items-center hover:text-[#3fa338]">
          <Link to="/matches/PL">Matches</Link>
        </div>
        <div className=" px-2 h-full text-center flex items-center hover:text-[#3fa338]">
          <Link to="/rankings/PL">Rankings</Link>
        </div>
        <div className=" px-2 h-full text-center flex items-center hover:text-[#3fa338]">
          <Link to="/bracket">Bracket</Link>
        </div>
      </div>
    </header>
  );
}

export default React.memo(CHeader);
