import { Badge, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IPathNameChild } from "../..";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import CTooltip from "../../components/CTooltip";
import {
  fetchCompetitionStandingsFootball,
  fetchHead2HeadFootball,
} from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { Match } from "../../types/football-matches";
import { format } from "date-fns";
const iconWarning: string = require("../../assets/icons/warning.svg").default;

interface InfoMatches extends Props {
  idMatches?: number;
}
function InfoMatches({ idMatches }: InfoMatches) {
  console.log("Render InfoMatches");
  const dispatch = useDispatchRoot();
  const {
    head2Head,
    rootMatches,
    competitionsStandings,
    loadingModalFootball,
  } = useSelectorRoot((state: RootState) => state.football);
  const navigate = useNavigate();
  const { idMatch, codeMatches } = useParams<IPathNameChild>();
  const [dataMatch, setDataMatch] = useState<Match | undefined>(
    rootMatches.matches.find((e: Match) => e.id === Number(idMatch))
  );

  const progressAway: any =
    (head2Head.aggregates.awayTeam.wins /
      head2Head.aggregates.numberOfMatches) *
    100;
  const progressDraws: any =
    (head2Head.aggregates.awayTeam.draws /
      head2Head.aggregates.numberOfMatches) *
    100;
  const progressHome: any =
    (head2Head.aggregates.homeTeam.wins /
      head2Head.aggregates.numberOfMatches) *
    100;

  useEffect(() => {
    // const params: IFiltersAPI = {
    //   competitions: codeMatches!,
    // };
    // dispatch(fetchMatchesFootball(params))
    dispatch(fetchHead2HeadFootball(Number(idMatch)));
    dispatch(fetchCompetitionStandingsFootball(codeMatches!));
  }, []);

  useEffect(() => {
    setDataMatch(
      rootMatches.matches.find((e: Match) => e.id === Number(idMatch))
    );
  }, [rootMatches]);

  console.log(dataMatch);

  return (
    <div className="bg-white rounded-md p-3">
      <div>
        <div className="flex justify-between pb-3">
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-3 border rounded-md hover:bg-gray-100"
          >
            <div className="flex space-x-4">
              <svg
                className="w-4 h-4 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          </button>
          <span className="font-semibold text-2xl capitalize">{`${
            dataMatch ? Utils.removeSpecialKey(dataMatch?.stage!, "_") : ""
          }/Matchday ${dataMatch?.season.currentMatchday}`}</span>
          <span className="font-medium text-2xl w-14"></span>
        </div>
        <div className="pb-4">
          <Table>
            <Table.Head className="text-base">
              <Table.HeadCell className="w-20">
                <div>
                  {dataMatch &&
                    format(new Date(dataMatch?.utcDate!), "dd-MM-yyyy")}
                </div>
                <div>
                  {dataMatch && format(new Date(dataMatch?.utcDate!), "hh:mm")}
                </div>
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                <div className="flex items-center justify-center">
                  <span>{head2Head.aggregates.awayTeam.name}</span>
                  <span className="h-3 w-3 ml-2 bg-green-600 rounded-full"></span>
                </div>
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                <div className="flex items-center justify-center">
                  <span>{head2Head.aggregates.homeTeam.name}</span>
                  <span className="h-3 w-3 ml-2 bg-red-600 rounded-full"></span>
                </div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y whitespace-nowrap font-bold text-gray-900 dark:text-white">
              <Table.Row className="">
                <Table.Cell className="font-bold">Odds</Table.Cell>
                <Table.Cell className="text-center" colSpan={2}>
                  {dataMatch?.odds.awayWin
                    ? `${dataMatch?.odds.awayWin}/${dataMatch?.odds.draw}/${dataMatch?.odds.homeWin}`
                    : ""}
                </Table.Cell>
              </Table.Row>
              {dataMatch?.status === "POSTPONED" ? (
                <Table.Row className="">
                  <Table.Cell className="">HalfTime</Table.Cell>
                  <Table.Cell
                    className="text-center font-semibold text-orange-400"
                    colSpan={2}
                  >
                    {dataMatch?.status}
                  </Table.Cell>
                </Table.Row>
              ) : (
                ""
              )}
              {dataMatch?.score.winner ? (
                <React.Fragment>
                  <Table.Row className="">
                    <Table.Cell className="">HalfTime</Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.halfTime.awayTeam}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.halfTime.homeTeam}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="">
                    <Table.Cell className="">Fulltime</Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.penalties.awayTeam
                        ? dataMatch?.score.fullTime.awayTeam -
                          dataMatch?.score.penalties.awayTeam
                        : dataMatch?.score.fullTime.awayTeam}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.penalties.homeTeam
                        ? dataMatch?.score.fullTime.homeTeam -
                          dataMatch?.score.penalties.homeTeam
                        : dataMatch?.score.fullTime.homeTeam}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="">
                    <Table.Cell className="">Penalties</Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.penalties.awayTeam ?? "-"}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {dataMatch?.score.penalties.homeTeam ?? "-"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="">
                    <Table.Cell className="">Duration</Table.Cell>
                    <Table.Cell className="text-center capitalize" colSpan={2}>
                      {Utils.removeSpecialKey(dataMatch?.score.duration, `_`)}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              ) : (
                ""
              )}
              <Table.Row className="">
                <Table.Cell
                  colSpan={3}
                  className="text-center bg-[#01b243] -my-2"
                >
                  <span className="text-center font-semibold uppercase text-white">
                    Head two head
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Wins</Table.Cell>
                <Table.Cell className="" colSpan={2}>
                  <div className="flex w-full h-6 text-white font-bold">
                    {/* awayTeam */}
                    <div
                      style={{ width: `${progressAway}%` }}
                      className=" bg-green-600 flex items-center justify-center relative rounded-l-lg"
                    >
                      {parseInt(progressAway) >= 10
                        ? `${head2Head.aggregates.awayTeam.wins}(${parseInt(
                            progressAway
                          )}%)`
                        : head2Head.aggregates.awayTeam.wins}
                    </div>
                    <div
                      style={{
                        width: `${100 - (progressAway + progressHome)}%`,
                      }}
                      className={` bg-gray-400 flex items-center justify-center`}
                    >
                      {parseInt(progressDraws) >= 10
                        ? ` ${
                            head2Head.aggregates.numberOfMatches -
                            (head2Head.aggregates.homeTeam.wins +
                              head2Head.aggregates.awayTeam.wins)
                          }(${parseInt(progressDraws)}%)`
                        : head2Head.aggregates.homeTeam.draws}
                    </div>
                    <div
                      style={{ width: `${progressHome}%` }}
                      className="bg-red-600 flex items-center justify-center rounded-r-lg"
                    >
                      {parseInt(progressHome) >= 10
                        ? `${head2Head.aggregates.homeTeam.wins}(${parseInt(
                            progressHome
                          )}%)`
                        : head2Head.aggregates.homeTeam.wins}
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="">
                <Table.Cell className="">Number Of Matches</Table.Cell>
                <Table.Cell className="text-center" colSpan={2}>
                  {head2Head.aggregates.numberOfMatches}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Goals</Table.Cell>
                <Table.Cell className="text-center" colSpan={2}>
                  {head2Head.aggregates.totalGoals}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Badge color="warning" className="mb-2 py-2">
          <div className=" flex justify-between items-center">
            <div className="cursor-pointer  pr-4">
              <CTooltip
                content={`Api does not return all matches data out of ${head2Head.count}/${head2Head.aggregates.numberOfMatches} matches!!!`}
              >
                <img className="w-5 h-5" color="red" src={iconWarning} alt="" />
              </CTooltip>
            </div>
            <span className="text-lg text-black font-semibold">
              {head2Head.count} matches in data
            </span>
          </div>
        </Badge>
      </div>
      {head2Head.matches?.map((e: any, i: number) => {
        let urlAwayTeam: any | string;
        let urlHomeTeam: any | string;
        competitionsStandings?.standings.forEach((standing) => {
          standing?.table.forEach((table: any) => {
            if (table.team.id === e.awayTeam.id) {
              urlAwayTeam = table.team.crestUrl;
            } else if (table.team.id === e.homeTeam.id) {
              urlHomeTeam = table.team.crestUrl;
            }
          });
        });

        return (
          <CLoading key={i} loading={loadingModalFootball}>
            <div
              onClick={() => {
                // dispatch(fetchHead2HeadFootball(e.id));
              }}
              className="relative border mb-2 p-2 rounded-md h-fit hover:bg-gray-200 hover:cursor-pointer"
            >
              {e.status === "POSTPONED" && (
                <div className="absolute top-0 right-0 bg-orange-300 opacity-30 w-full h-full font-bold text-lg flex items-center justify-center">
                  <span className="-rotate-12	">POSTPONED</span>
                </div>
              )}
              <span className="pb-2 font-bold">{e.competition.name}</span>

              <h2 className="pb-2 font-semibold text">
                {Utils.formatDate(e.utcDate)}
              </h2>
              <h2></h2>
              <div className="flex justify-between">
                <div className="awayTeam flex items-center gap-2 pb-2">
                  <img className="h-10 w-10" src={urlAwayTeam} alt="" />
                  <span className="cursor-pointer">{e.awayTeam.name}</span>
                </div>

                <span className="pr-1">
                  {e.score.fullTime.awayTeam ?? "coming"}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="homeTeam flex items-center gap-2">
                  <img className="h-10 w-10" src={urlHomeTeam} alt="" />
                  <span className="cursor-pointer">{e.homeTeam.name}</span>
                </div>
                <span className="pr-1">
                  {e.score.fullTime.homeTeam ?? "coming"}
                </span>
              </div>
            </div>
          </CLoading>
        );
      })}
    </div>
  );
}

export default React.memo(InfoMatches);
