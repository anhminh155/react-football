import { Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

type INav = "home" | "hxh" | "tips";

function CHeader({}: Props) {
  const navigate = useNavigate();
  const [nav, setNav] = useState("home");
  const objGmt = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  const gmt = 7;
  return (
    <header className="w-screen">
      <div className="h-14 bg-[#2a3038] flex items-center px-6">
        <div className="font-bold text-xl">
          <span className=" text-white">WorldCup</span>
          <span className="text-[#3fa338]">Info</span>
        </div>
      </div>
      <div className="h-14 bg-[#05b244] flex items-center justify-between px-6">
        <div className="bg-[linear-gradient(180deg,#04a941,#059b3d)] h-14 flex items-center font-bold text-lg px-3 cursor-pointer">
          <span className=" text-white">Bóng đá</span>
        </div>
        <div className="">
          <Dropdown
            inline={true}
            label={<span>GMT{gmt}+</span>}
            dismissOnClick={false}
          >
            {objGmt.map((e, i) => {
              if (e > 0) {
                return <Dropdown.Item key={i}>+{e}</Dropdown.Item>;
              } else {
                return <Dropdown.Item key={i} >{e}</Dropdown.Item>;
              }
            })}
          </Dropdown>
        </div>
      </div>
      <div className="shadow-md h-11 flex items-center px-6 text-xl">
        <div className="pr-3">
          <Link to="/home">Home</Link>
        </div>
        <div className="pr-3">
          <Link to="/rank">BXH</Link>
        </div>
        <div className="">
          <Link to="/bracket">Bracket</Link>
        </div>
      </div>
    </header>
  );
}

export default React.memo(CHeader);
