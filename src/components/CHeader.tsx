import { Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setNavbar } from "../redux/controller/app.slice";
import { useDispatchRoot, useSelectorRoot } from "../redux/hooks";
import { RootState } from "../redux/store";

type Props = {};

// type INav = "home" | "hxh" | "tips";

function CHeader({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatchRoot();
  const { navbar } = useSelectorRoot((state: RootState) => state.app);
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
        <div
          onClick={() => dispatch(setNavbar("home"))}
          className={`${
            navbar === "home" ? "font-bold text-[#3fa338]" : ""
          } px-2 h-full text-center cursor-pointer flex items-center border border-l-1 border-r-transparent hover:text-[#3fa338]`}
        >
          <Link to="/home">Home</Link>
        </div>
        <div
          onClick={() => dispatch(setNavbar("matches"))}
          className={`${
            navbar === "matches" ? "font-bold text-[#3fa338]" : ""
          } px-2 h-full text-center cursor-pointer flex items-center hover:text-[#3fa338]`}
        >
          <Link to="/matches/PL">Matches</Link>
        </div>
        <div
          onClick={() => dispatch(setNavbar("rankings"))}
          className={`${
            navbar === "rankings" ? "font-bold text-[#3fa338]" : ""
          } px-2 h-full text-center cursor-pointer flex items-center hover:text-[#3fa338]`}
        >
          <Link to="/rankings/PL">Rankings</Link>
        </div>
        <div
          onClick={() => dispatch(setNavbar("bracket"))}
          className={`${
            navbar === "bracket" ? "font-bold text-[#3fa338]" : ""
          } px-2 h-full text-center cursor-pointer flex items-center hover:text-[#3fa338]`}
        >
          <Link to="/bracket">Bracket</Link>
        </div>
      </div>
    </header>
  );
}

export default React.memo(CHeader);
