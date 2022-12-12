import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCompetitionTierWorldCup } from "../../redux/controller/worldCup.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";

type Props = {};

function ListCompetition({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatchRoot();
  const location = useLocation();

  const { competitions } = useSelectorRoot(
    (state: RootState) => state.worldCup
  );

  const nextPathName =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  React.useEffect(() => {
    dispatch(fetchCompetitionTierWorldCup("TIER_ONE"));
  }, []);

  return (
    <div className="flex flex-col gap-y-2 bg-white divide-y">
      <ul className=" odd:bg-white even:bg-slate-50">
        {competitions?.map((item: any, index: number) => {
          return (
            <li
              key={index}
              onClick={() => {
                navigate(`${item.code}`);
              }}
              className={`${
                nextPathName === item.code
                  ? "bg-[#65bc85] font-bold text-white"
                  : ""
              }
             hover:bg-[#65bc85] hover:font-bold hover:text-white px-2 py-1 cursor-pointer`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListCompetition;
