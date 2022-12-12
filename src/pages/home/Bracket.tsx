import * as React from "react";
import CTagGroupTeams from "../../components/CTagGroupTeams";
import CTagTeam from "../../components/CTagTeam";
import img from "../../assets/images/background-wc-qatar.jpg";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  fetchMatchesAllWorldCup,
  fetchStandingsWorldCup,
} from "../../redux/controller/worldCup.slice";
import { Standing } from "../../types/football-world-cup";
import CLoadingPage from "../../components/CLoadingPage";

function Bracket(): JSX.Element {
  const dispatch = useDispatchRoot();
  const { loading, standingsTotal, teams, matches } = useSelectorRoot(
    (state: RootState) => state.worldCup
  );

  const match_last_16: any = matches.filter((e: any) => e.stage === "LAST_16");

  React.useEffect(() => {
    dispatch(fetchStandingsWorldCup());
    dispatch(fetchMatchesAllWorldCup());
  }, []);

  const RenderTable = (location: "left" | "right") => {
    return standingsTotal?.standings?.map((e: Standing, i) => {
      if (location === "left" ? i < 4 : i >= 4) {
        return (
          <CTagGroupTeams key={i} title={e.group}>
            {e.table.map((table, index) => {
              const team = teams.find(
                (team: any) => team.name === table.team.name
              );
              return (
                <CTagTeam
                  key={index}
                  // name={table.team.name}
                  name={team?.tla || "---"}
                  urlFlag={table.team.crestUrl}
                />
              );
            })}
          </CTagGroupTeams>
        );
      }
    });
  };

  const RenderMatch32 = (location: "left" | "right") => {
    return match_last_16?.map((match: any, index: number) => {
      if (location === "left" ? index < 4 : index >= 4) {
        const awayTeam = teams.find(
          (team: any) => team.name === match.awayTeam.name
        );
        const homeTeam = teams.find(
          (team: any) => team.name === match.homeTeam.name
        );
        return (
          <div
            key={index}
            className="relative h-44 flex justify-center flex-col gap-x-2"
          >
            <CTagTeam
              name={awayTeam?.tla || "---"}
              urlFlag={awayTeam?.crestUrl}
              titleOutSize="A1"
            />
            <CTagTeam
              name={homeTeam?.tla || "---"}
              urlFlag={homeTeam?.crestUrl}
              titleOutSize="A1"
            />

            {location === "left" ? (
              <div className="border mobile:invisible desktop:visible border-gray-400 rounded-r-lg w-5 border-l-transparent h-20 absolute -right-5 top-14" />
            ) : (
              <div className="border mobile:invisible desktop:visible border-gray-400 rounded-l-lg w-5 border-r-transparent h-20 absolute -left-5 top-14" />
            )}
          </div>
        );
      }
    });
  };

  return loading ? (
    <CLoadingPage />
  ) : (
    <div className="flex mobile:flex-col desktop:flex-row justify-between h-full mx-4 mb-4">
      <div className="flex gap-y-4 mobile:flex-wrap mobile:gap-x-4 desktop:flex-col mobile:pt-4 mobile:justify-center desktop:justify-start">
        {RenderTable("left")}
      </div>
      {/* Right */}

      {/* 1/16 */}
      <div className="flex justify-between desktop:mx-5 w-full mobile:order-last desktop:order-none">
        <div className="flex gap-y-4 flex-col">{RenderMatch32("left")}</div>

        {/* 1/8 */}
        <div className="flex justify-between desktop:mx-5 w-full">
          <div className="flex flex-col">
            <div className="relative">
              <div className="relative flex justify-end items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute left-0 top-1/2"></div>
              </div>
              <div className="absolute -right-20 top-40 z-10">
                <CTagTeam name="POR" />
              </div>
              <div className="relative flex justify-end items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute left-0 top-1/2"></div>
              </div>
              <div className="border border-gray-400 rounded-r-lg w-5 border-l-transparent h-[186px] absolute -right-5 top-[96px]"></div>
            </div>
            <div className="relative -my-2">
              <div className="relative flex justify-end items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute left-0 top-1/2"></div>
              </div>
              <div className="absolute -right-20 top-40 z-10">
                <CTagTeam name="POR" />
              </div>
              <div className="relative flex justify-end items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute left-0 top-1/2"></div>
              </div>
              <div className="border border-gray-400 rounded-r-lg w-5 border-l-transparent h-[186px] absolute -right-5 top-[96px]"></div>
            </div>
          </div>

          {/* 1/4 */}
          <div className="relative flex items-center">
            <div className="absolute right-44 top-[350px] z-10">
              <CTagTeam name="POR" />
            </div>
            <div className="mobile:invisible desktop:visible absolute right-48 top-48  h-96 w-9 border border-gray-400 rounded-r-lg border-l-transparent"></div>
            {/* 1/2 */}
            <div className="flex items-center mobile:mb-0 desktop:mb-36">
              <div className="border border-gray-500 rounded-lg">
                <img src={img} alt="" className="h-24 w-auto m-auto" />
                <CTagTeam className="px-4 pt-1 pb-5" name="POR" />
              </div>
            </div>
            {/* end 1/2 */}
            <div className="absolute top-[350px] left-44 z-10">
              <CTagTeam name="POR" />
            </div>
            <div className="mobile:invisible desktop:visible absolute left-48 top-48  h-96 w-9 border border-gray-400 rounded-l-lg border-r-transparent"></div>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <div className="relative flex justify-start items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute right-0 top-1/2"></div>
              </div>
              <div className="absolute -left-20 top-40 z-10">
                <CTagTeam name="POR" />
              </div>
              <div className="relative flex justify-start items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute right-0 top-1/2"></div>
              </div>
              <div className="border border-gray-400 rounded-l-lg w-5 border-r-transparent h-[186px] absolute -left-5 top-[96px]"></div>
            </div>
            <div className="relative -my-2">
              <div className="relative flex justify-start items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute right-0 top-1/2"></div>
              </div>
              <div className="absolute -left-20 top-40 z-10">
                <CTagTeam name="POR" />
              </div>
              <div className="relative flex justify-start items-center h-44 w-36 my-3">
                <CTagTeam name="POR" />
                <div className="mobile:invisible desktop:visible bg-gray-400 h-px w-4 absolute right-0 top-1/2"></div>
              </div>
              <div className="border border-gray-400 rounded-l-lg w-5 border-r-transparent h-[186px] absolute -left-5 top-[96px]"></div>
            </div>
          </div>
        </div>
        {/* end 1/8 */}

        <div className="flex gap-y-4 flex-col">{RenderMatch32("right")}</div>
      </div>
      {/* ----------- */}
      <div className="flex gap-y-4 mobile:flex-wrap mobile:gap-x-4 desktop:flex-col mobile:pt-4 mobile:justify-center desktop:justify-start">
        {RenderTable("right")}
      </div>
    </div>
  );
}

export default React.memo(Bracket);
