import { Pagination, Table, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import { fetchMatchesFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { IFiltersAPI } from "../../types/football-type";
import { Match } from "../../types/head2Head.football";
import ListCompetitionFake from "./ListCompetitionFake";

function Matches({}: Props) {
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootMatches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { codeMatches } = useParams<{
    codeMatches?: string;
  }>();
  const [numberPagination, setNumberPagination] = useState<number>(1);
  const [data, setData] = useState<any>(rootMatches.matches);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const params: IFiltersAPI = {
      competitions: codeMatches!,
      status: "SCHEDULED",
    };
    dispatch(fetchMatchesFootball(params));
  }, []);

  useEffect(() => {
    rootMatches.matches.length >= 10
      ? setData(Utils.handelPagination(rootMatches.matches, 10, 1))
      : setData(rootMatches.matches);
    setNumberPagination(1);
  }, [rootMatches.matches]);

  // let upcoming_matches:any = rootMatches?.matches;
  // let highest_odds = {
  //   homeWin: 0.0,
  //   draw: 0.0,
  //   awayWin: 0.0,
  // };
  // let matches:any = {
  //   homeWin: null,
  //   draw: null,
  //   awayWin: null,
  // };

  // for (
  //   var m, _pj_c = 0, _pj_a = upcoming_matches, _pj_b = _pj_a.length;
  //   _pj_c < _pj_b;
  //   _pj_c += 1
  // ) {
  //   m = _pj_a[_pj_c];

  //   try {
  //     if (
  //       m["odds"]["homeWin"] !== null &&
  //       m["odds"]["homeWin"] > highest_odds["homeWin"]
  //     ) {
  //       highest_odds["homeWin"] = m["odds"]["homeWin"];
  //       matches["homeWin"] = m;
  //     }

  //     if (
  //       m["odds"]["draw"] !== null &&
  //       m["odds"]["draw"] > highest_odds["draw"]
  //     ) {
  //       highest_odds["draw"] = m["odds"]["draw"];
  //       matches["draw"] = m;
  //     }

  //     if (
  //       m["odds"]["awayWin"] !== null &&
  //       m["odds"]["awayWin"] > highest_odds["awayWin"]
  //     ) {
  //       highest_odds["awayWin"] = m["odds"]["awayWin"];
  //       matches["awayWin"] = m;
  //     }
  //   } catch (e) {
  //     if (e) {
  //       console.log("You need to enable Odds in User-Panel.");
  //     } else {
  //       throw e;
  //     }
  //   }
  // }

  // console.log(
  //   "Highest odds for upcoming games today for home win, draw and away win are as follows:\n"
  // );
  // console.log(
  //   "homeWin: " +
  //     matches["homeWin"]["homeTeam"]["name"] +
  //     " against " +
  //     matches["homeWin"]["awayTeam"]["name"] +
  //     " (" +
  //     highest_odds["homeWin"].toString() +
  //     ")"
  // );
  // console.log(
  //   "draw: " +
  //     matches["draw"]["homeTeam"]["name"] +
  //     " against " +
  //     matches["draw"]["awayTeam"]["name"] +
  //     " (" +
  //     highest_odds["draw"].toString() +
  //     ")"
  // );
  // console.log(
  //   "awayWin: " +
  //     matches["awayWin"]["homeTeam"]["name"] +
  //     " against " +
  //     matches["awayWin"]["awayTeam"]["name"] +
  //     " (" +
  //     highest_odds["awayWin"].toString() +
  //     ")"
  // );

  const RenderTable = () => {
    return (
      <CLoading loading={loadingFootball}>
        <div className="desktop:flex justify-between items-center mb-3">
          <label className="inline-flex relative cursor-pointer">
            <input
              type="checkbox"
              defaultValue=""
              className="sr-only peer"
              checked={checked}
              onChange={(e) => {
                const params: IFiltersAPI = {
                  competitions: codeMatches!,
                  status: "SCHEDULED",
                };
                if (checked) {
                  dispatch(fetchMatchesFootball(params));
                  setChecked(!checked);
                } else {
                  delete params.status;
                  dispatch(fetchMatchesFootball(params));
                  setChecked(!checked);
                }
              }}
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
             dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
               after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
            />
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {`All(Finished/upcoming)`}
            </span>
          </label>

          <Pagination
            className="-mt-2"
            currentPage={numberPagination}
            onPageChange={(e) => {
              if (rootMatches.count >= 10) {
                setData(Utils.handelPagination(rootMatches.matches, 10, e));
                setNumberPagination(e);
              }
            }}
            showIcons={true}
            totalPages={
              rootMatches.count >= 10 ? Math.floor(rootMatches.count / 10) : 1
            }
          />
        </div>
        <Table>
          <Table.Head className="table-ranks">
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Day</Table.HeadCell>
            <Table.HeadCell>Hours</Table.HeadCell>
            <Table.HeadCell className="text-right">Owner</Table.HeadCell>
            <Table.HeadCell className="text-center w-24">Score</Table.HeadCell>
            <Table.HeadCell>Guest</Table.HeadCell>
            <Table.HeadCell className="text-center">Odds</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((match: Match, i: number) => {
              const day = new Date(match?.utcDate).toDateString();
              const time = new Date(match?.utcDate).toLocaleTimeString(
                "en-US",
                {
                  // en-US can be set to 'default' to use user's browser settings
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <Table.Row
                  key={i}
                  onClick={() => {
                    console.log();
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                >
                  <Table.Cell>{(numberPagination - 1) * 10 + i + 1}</Table.Cell>
                  <Table.Cell>{day}</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell className="text-right">
                    {match.homeTeam.name}
                  </Table.Cell>
                  <Table.Cell className="text-center w-24">
                    {match.score.fullTime.homeTeam !== null
                      ? `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`
                      : "VS"}
                  </Table.Cell>

                  <Table.Cell>{match.awayTeam.name}</Table.Cell>

                  <Table.Cell className="text-center">{match.odds.homeWin || 0}/{match.odds.draw || 0}/{match.odds.awayWin || 0}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </CLoading>
    );
  };
  return (
    <div className="mx-6 select-none">
      <div className="desktop:flex gap-x-4 mobile:inline">
        <div className="min-w-fit">
          <div className=" bg-[#01b243] text-white text-lg p-2 mt-3 border rounded-t-md w-full">
            HOT Tournaments
          </div>
          <CLoading loading={loadingFootball}>
            <ListCompetitionFake
              handleOnChange={(code: string) => {
                const params: IFiltersAPI = {
                  competitions: code,
                  status: "SCHEDULED",
                };
                if (checked) {
                  delete params.status;
                  dispatch(fetchMatchesFootball(params));
                } else {
                  dispatch(fetchMatchesFootball(params));
                }
              }}
            />
          </CLoading>
        </div>
        <div className="w-full my-3">{RenderTable()}</div>
      </div>
    </div>
  );
}

export default React.memo(Matches);
