import { Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IPathNameChild } from "../..";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import {
  fetchCompetitionStandingsFootball,
  fetchMatchesFootball,
} from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { IFiltersAPI } from "../../types/football-type";
import { Match } from "../../types/football.head2Head";
import InfoMatches from "./InfoMatches";
import ListCompetition from "./ListCompetition ";
import { format } from "date-fns";

function Matches({}: Props) {
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootMatches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { codeMatches, idMatch } = useParams<IPathNameChild>();
  const navigate = useNavigate();
  const [numberPagination, setNumberPagination] = useState<number>(1);
  const [data, setData] = useState<any>(rootMatches.matches);
  const [checked, setChecked] = useState<boolean>(false);
  const [idInfoMatch, setIdInfoMatch] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const params: IFiltersAPI = {
      competitions: codeMatches!,
      status: "SCHEDULED",
    };
    dispatch(fetchMatchesFootball(params));
  }, []);

  useEffect(() => {
    rootMatches.matches.length >= 10
      ? setData(Utils.handelPagination(rootMatches.matches, 10, 0))
      : setData(rootMatches.matches);
    setNumberPagination(1);
  }, [rootMatches.matches]);

  const RenderTable = () => {
    return (
      <div>
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
              className="w-11 h-6 bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
             dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
               after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-900 peer-checked:bg-[#01b243]"
            />
            <span className="ml-3 text-sm font-semibold text-gray-900 dark:text-gray-300">
              {`All(Finished/upcoming)`}
            </span>
          </label>

          <Pagination
            // layout="table"
            className="-mt-2"
            currentPage={numberPagination}
            onPageChange={(e) => {
              setData(Utils.handelPagination(rootMatches.matches, 10, e - 1));
              setNumberPagination(e);
              // if (rootMatches.count >= 10) {
              // setData(Utils.handelPagination(rootMatches.matches, 10, e-1));
              // setNumberPagination(e);
              // }
            }}
            showIcons={true}
            totalPages={
              rootMatches.count >= 10
                ? Math.floor(rootMatches.count / 10) + 1
                : 1
            }
          />
        </div>
        <CLoading loading={loadingFootball}>
          <Table>
            <Table.Head className="table-ranks">
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Day</Table.HeadCell>
              <Table.HeadCell>Hours</Table.HeadCell>
              <Table.HeadCell className="text-right">Owner</Table.HeadCell>
              <Table.HeadCell className="text-center w-24">
                Score
              </Table.HeadCell>
              <Table.HeadCell>Guest</Table.HeadCell>
              <Table.HeadCell className="text-center">Odds</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((match: Match, i: number) => {
                // const day = new Date(match?.utcDate).toDateString();
                // const time = new Date(match?.utcDate).toLocaleTimeString(
                //   "en-US",
                //   {
                //     // en-US can be set to 'default' to use user's browser settings
                //     hour: "2-digit",
                //     minute: "2-digit",
                //   }
                // );

                return (
                  <Table.Row
                    key={i}
                    onClick={() => {
                      if (match.homeTeam.name) {
                        console.log(match.id);
                        setIdInfoMatch(match.id);
                        navigate(`${location.pathname}/${match.id}`);
                      }
                    }}
                    className={`${
                      match.homeTeam.name
                        ? "bg-white hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                        : "bg-orange-200"
                    } dark:border-gray-700 dark:bg-gray-800 w-40 `}
                  >
                    <Table.Cell>
                      {(numberPagination - 1) * 10 + i + 1}
                    </Table.Cell>
                    <Table.Cell>{format(new Date(match?.utcDate!), "dd-MM-yyyy")}</Table.Cell>
                    <Table.Cell>{format(new Date(match?.utcDate!), "hh:mm")}</Table.Cell>
                    <Table.Cell className="text-right">
                      {match.homeTeam.name ? match.homeTeam.name : "Not Data"}
                    </Table.Cell>
                    <Table.Cell className="text-center w-24">
                      {match.score.fullTime.homeTeam !== null
                        ? `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`
                        : match.status === "POSTPONED"
                        ? <div className="font-semibold text-orange-400">POSTPONED</div>
                        : "VS"}
                    </Table.Cell>

                    <Table.Cell>
                      {match.awayTeam.name ? match.awayTeam.name : "Not Data"}
                    </Table.Cell>

                    <Table.Cell className="text-center">
                      {match.odds.homeWin || 0}/{match.odds.draw || 0}/
                      {match.odds.awayWin || 0}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </CLoading>
      </div>
    );
  };
  return (
    <div className="mx-6 select-none">
      <div className="desktop:flex gap-x-4 mobile:inline">
        <div className="min-w-fit">
          <CLoading loading={loadingFootball}>
            <ListCompetition
              getCompetitionCode={(code: string) => {
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
        <div className="w-full my-3">
          {idMatch ? <InfoMatches idMatches={idInfoMatch} /> : RenderTable()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Matches);
