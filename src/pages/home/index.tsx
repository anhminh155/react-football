import * as React from 'react';
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import CTagGroupTeams from "../../components/CTagGroupTeams";
import CTagTeam from "../../components/CTagTeam";
import img from "../../assets/images/background-wc-qatar.jpg";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  fetchMatchesWorldCup,
  fetchStandingsWorldCup,
  fetchTeamsWorldCup,
} from "../../redux/controller/worldCup.slice";
import { Standing } from "../../types/football-world-cup";


function Home():JSX.Element {
  const dispatch = useDispatchRoot();
  const { loading, standings } = useSelectorRoot(
    (state: RootState) => state.worldCup
  );

  console.log(standings?.standings);

  React.useEffect(() => {
    dispatch(fetchStandingsWorldCup());
    // dispatch(fetchMatchesWorldCup())
  }, []);

  // type RenderTable = "left" | "right"

  type Props = {
    location: 'left'|  'right',
    children?: React.ReactNode
  };


  // const RenderTable:React.FC<React.ReactNode> = (location: 'left') => {
  //   standings?.standings?.map((e: Standing, i) => {
  //     if ((location === "left") ? i < 4 : i >= 4) {
  //       return (
  //         <CTagGroupTeams key={i} title={e.group}>
  //           {e.table.map((table, index) => {
  //             console.log(table);
  //             return (
  //               <CTagTeam
  //                 key={index}
  //                 // name={table.team.name}
  //                 name={"POR"}
  //                 urlFlag={table.team.crestUrl}
  //               />
  //             );
  //           })}
  //         </CTagGroupTeams>
  //       );
  //     }
  //   });
  // };

  return (
    <div className="flex mobile:flex-col desktop:flex-row justify-between h-full desktop:w-full mx-4 w-full">
      <div className="flex gap-y-4 mobile:flex-wrap mobile:gap-x-4 desktop:flex-col mobile:pt-4 mobile:justify-center desktop:justify-start">

        {/* {RenderTable('left')} */}
      </div>
      {/* Right */}
      <div className="order-last flex gap-y-4 mobile:flex-wrap mobile:gap-x-4 desktop:flex-col mobile:pt-4 mobile:justify-center desktop:justify-start">
        <CTagGroupTeams title="Group A">
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
        </CTagGroupTeams>
        <CTagGroupTeams title="Group A">
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
        </CTagGroupTeams>
        <CTagGroupTeams title="Group A">
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
        </CTagGroupTeams>
        <CTagGroupTeams title="Group A">
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
          <CTagTeam name="POR" />
        </CTagGroupTeams>
      </div>

      {/* 1/16 */}
      <div className="flex justify-between desktop:mx-5 w-full mobile:order-last desktop:order-none">
        <div className="flex gap-y-4 flex-col">
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-r-lg w-5 border-l-transparent h-20 absolute -right-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-r-lg w-5 border-l-transparent h-20 absolute -right-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-r-lg w-5 border-l-transparent h-20 absolute -right-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-r-lg w-5 border-l-transparent h-20 absolute -right-5 top-14"></div>
          </div>
        </div>

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

        <div className="flex gap-y-4 flex-col">
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-l-lg w-5 border-r-transparent h-20 absolute -left-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-l-lg w-5 border-r-transparent h-20 absolute -left-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-l-lg w-5 border-r-transparent h-20 absolute -left-5 top-14"></div>
          </div>
          <div className="relative h-44 flex justify-center flex-col gap-x-2">
            <CTagTeam name="POR" titleOutSize="A1" />
            <CTagTeam name="POR" titleOutSize="A1" />
            <div className="border mobile:invisible desktop:visible border-gray-400 rounded-l-lg w-5 border-r-transparent h-20 absolute -left-5 top-14"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home);
