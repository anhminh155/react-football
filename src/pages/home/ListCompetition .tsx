import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPathNameChild } from "../..";
import { fetchCompetitionTierFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { Competition } from "../../types/football-competition";

interface IListCompetition extends Props {
  getCompetitionCode(code: string): void;
}

function ListCompetition({ getCompetitionCode }: IListCompetition) {
  const { rootCompetitions } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const dispatch = useDispatchRoot();
  const navigate = useNavigate();
  const { codeMatches, competitionCode } = useParams<IPathNameChild>();

  const listAreas = {
    england: 2072,
    world: 2267,
  };

  useEffect(() => {
    dispatch(fetchCompetitionTierFootball(listAreas.england));
  }, []);

  return (
    <div>
      <div className=" bg-[#01b243] text-white text-lg py-1 px-2 mt-3 w-full border rounded-t-md uppercase font-bold flex justify-between">
        <span>League england</span>
        <span className="cursor-pointer"></span>
      </div>
      <div
        className={`${
          rootCompetitions.competitions ? "" : "h-52"
        } flex flex-col gap-y-2 bg-white divide-y`}
      >
        <ul className=" odd:bg-white even:bg-slate-50">
          {rootCompetitions.competitions[`2077`]?.map(
            (item: Competition, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`${item.code}`);

                    getCompetitionCode(item.code);
                  }}
                  className={`${
                    (codeMatches ?? competitionCode) === item.code
                      ? "bg-[#65bc85] font-bold text-white"
                      : ""
                  }
             hover:bg-[#65bc85] hover:font-bold hover:text-white px-2 py-1 cursor-pointer `}
                >
                  <div className="flex items-center ">
                    <img
                      className="h-6 w-8 pr-1 border-r-2 border-gray-500"
                      src={item.emblemUrl}
                      alt=""
                    />
                    <span className="pl-2">{item.name}</span>
                  </div>
                </li>
              );
            }
          )}
          <div className=" bg-[#01b243] text-white text-lg py-1 px-2 mt-3 w-full uppercase font-bold flex justify-between">
            <span>World</span>
            <span
              onClick={() => {
                if (!rootCompetitions.competitions[listAreas.world]) {
                  dispatch(fetchCompetitionTierFootball(listAreas.world));
                } else {
                }
              }}
              className="cursor-pointer"
            >
              {rootCompetitions.competitions[listAreas.world] ? "" : "+"}
            </span>
          </div>
          {rootCompetitions.competitions[listAreas.world]?.map(
            (item: Competition, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`${item.code}`);

                    getCompetitionCode(item.code);
                  }}
                  className={`${
                    (codeMatches ?? competitionCode) === item.code
                      ? "bg-[#65bc85] font-bold text-white"
                      : ""
                  }
             hover:bg-[#65bc85] hover:font-bold hover:text-white px-2 py-1 cursor-pointer `}
                >
                  <div className="flex items-center ">
                    <img
                      className="h-6 w-8 pr-1 border-r-2 border-gray-500"
                      src={item.emblemUrl}
                      alt=""
                    />
                    <span className="pl-2">{item.name}</span>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(ListCompetition);
