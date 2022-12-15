import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataFake } from "../../common/dataFake";
import { fetchMatchesFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot } from "../../redux/hooks";
import { Props } from "../../types/define";
import { IFiltersAPI } from "../../types/football-type";

function ListCompetitionFake({}: Props) {
  const dispatch = useDispatchRoot();
  const navigate = useNavigate();

  const competitions = DataFake.CompetitionsFree().competitions;
  const { codeMatches } = useParams<{
    codeMatches?: string;
  }>();

  return (
    <div
      className={`${
        competitions ? "" : "h-52"
      } flex flex-col gap-y-2 bg-white divide-y`}
    >
      <ul className=" odd:bg-white even:bg-slate-50">
        {competitions?.map((item: any, index: number) => {
          return (
            <li
              key={index}
              onClick={() => {
                const params: IFiltersAPI = {
                  competitions: item.code,
                  status: "SCHEDULED",
                };
                navigate(`${item.code}`);
                dispatch(fetchMatchesFootball(params));
              }}
              className={`${
                codeMatches === item.code
                  ? "bg-[#65bc85] font-bold text-white"
                  : ""
              }
             hover:bg-[#65bc85] hover:font-bold hover:text-white px-2 py-1 cursor-pointer `}
            >
              <div className="flex items-center ">
                <img
                  className="h-4 w-8 pr-1 border-r-2 border-gray-500"
                  src={item.emblemUrl}
                  alt=""
                />
                <span className="pl-2">{item.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default React.memo(ListCompetitionFake);
