import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CLoading from "../../components/CLoading";
import { fetchBestScorersCompetitionsFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { IStanding, ITable } from "../../types/football-type";
import BestPlayer from "./BestPlayer";

interface ITableStandings extends Props {
  onSelectTable: any;
}
function TableStandings({ onSelectTable }: ITableStandings) {
  const dispatch = useDispatchRoot();
  const { competitionsStandings, loadingFootball } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const [activeTab, setActiveTab] = useState<
    "standings" | "bracket" | "bestPlayer"
  >("standings");

  const seasonYear = new Date(
    competitionsStandings?.season.startDate
  ).getFullYear();

  useEffect(() => {
    setActiveTab("standings");
  }, [competitionsStandings]);

  const RenderTable = () => {
    return competitionsStandings?.standings.map(
      (standing: IStanding, i: number) => {
        return (
          <CLoading key={i} loading={loadingFootball}>
            <Table>
              <Table.Head className="table-ranks">
                <Table.HeadCell className="w-12">
                  {standing.group ? "" : "Ranks"}
                </Table.HeadCell>
                <Table.HeadCell>{standing.group ?? "Ranks"}</Table.HeadCell>
                <Table.HeadCell>MP</Table.HeadCell>
                <Table.HeadCell>W</Table.HeadCell>
                <Table.HeadCell>D</Table.HeadCell>
                <Table.HeadCell>L</Table.HeadCell>
                <Table.HeadCell>GF</Table.HeadCell>
                <Table.HeadCell>GA</Table.HeadCell>
                <Table.HeadCell>GD</Table.HeadCell>
                <Table.HeadCell>Pts</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {standing.table.map((table: ITable, i: number) => {
                  return (
                    <Table.Row
                      key={i}
                      onClick={() => {
                        onSelectTable(table);
                      }}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {table.position}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {table.team.name}
                      </Table.Cell>
                      <Table.Cell>{table.playedGames}</Table.Cell>
                      <Table.Cell>{table.won}</Table.Cell>
                      <Table.Cell>{table.draw}</Table.Cell>
                      <Table.Cell>{table.lost}</Table.Cell>
                      <Table.Cell>{table.goalsFor}</Table.Cell>
                      <Table.Cell>{table.goalsAgainst}</Table.Cell>
                      <Table.Cell>{table.goalDifference}</Table.Cell>
                      <Table.Cell>{table.points}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </CLoading>
        );
      }
    );
  };

  return (
    <div className="mb-2">
      <div className=" bg-[#01b243] text-white text-lg p-2 my-3 border rounded-md">
        <div className="flex">
          <span className="pr-1">
            {competitionsStandings?.competition.name}
          </span>
          <span className="pr-2">Season:</span>
          {seasonYear}
        </div>
      </div>
      <div className="bg-white flex flex-col">
        <ul className="font-semibold border-b-2">
          <li
            onClick={() => setActiveTab("standings")}
            className={`${
              activeTab === "standings" ? "bg-[#05b244] text-white" : ""
            } cursor-pointer float-left px-2 py-3 hover:bg-[#05b244] hover:text-white`}
          >
            STANDINGS
          </li>
          {competitionsStandings?.standings?.length > 1 ? (
            <li
              onClick={() => setActiveTab("bracket")}
              className={`${
                activeTab === "bracket" ? "bg-[#05b244] text-white" : ""
              } cursor-pointer float-left px-2 py-3 hover:bg-[#05b244] hover:text-white`}
            >
              BRACKET
            </li>
          ) : (
            ""
          )}
          <li
            onClick={() => setActiveTab("bestPlayer")}
            className={`${
              activeTab === "bestPlayer" ? "bg-[#05b244] text-white" : ""
            } cursor-pointer float-left px-2 py-3 hover:bg-[#05b244] hover:text-white`}
          >
            BEST PLAYER
          </li>
        </ul>
      </div>
      <div className="">
        {(activeTab === "standings" && RenderTable()) ||
          (activeTab === "bracket" && <div>bracket</div>) ||
          (activeTab === "bestPlayer" && (
            <div className="mb-10">
              <BestPlayer
                competition={competitionsStandings?.competition.code}
              />
              <div
                onClick={() => {
                  // console.log(competitionsStandings.competition.code);                  
                  dispatch(
                    fetchBestScorersCompetitionsFootball({
                      competition: competitionsStandings.competition.code!,
                      limit: 200,
                    })
                  );
                }}
                className="text-center pt-4 cursor-pointer hover:underline"
              >
                More...
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default React.memo(TableStandings);
