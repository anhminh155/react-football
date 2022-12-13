import { Table, Tabs } from "flowbite-react";
import React from "react";
import { useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { IStanding, ITable } from "../../types/football-type";

interface ITableStandings extends Props {
  onSelectTable: any;
}
function TableStandings({ onSelectTable }: ITableStandings) {
  const { competitionsStandings } = useSelectorRoot(
    (state: RootState) => state.football
  );

  const seasonYear = new Date(
    competitionsStandings?.season.startDate
  ).getFullYear();

  const RenderTable = () => {
    return competitionsStandings?.standings.map(
      (standing: IStanding, i: number) => {
        return (
          <Table key={i}>
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
        );
      }
    );
  };
  const flag = competitionsStandings?.competition.code;
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
      {flag === "WC" || flag === "CLI" || flag === "EC" ? (
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="STANDINGS">
            <div className="-m-4">{RenderTable()}</div>
          </Tabs.Item>
          <Tabs.Item title="BEST PLAYER">BRACKET</Tabs.Item>
        </Tabs.Group>
      ) : (
        RenderTable()
      )}
    </div>
  );
}

export default React.memo(TableStandings);
