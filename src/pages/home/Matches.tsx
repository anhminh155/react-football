import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import ListCompetitionFake from "./ListCompetitionFake";

type Props = {};

function Matches({}: Props) {
  const dispatch = useDispatchRoot();
  const { loadingFootball, matches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { competitionCode } = useParams<{
    competitionCode?: string;
  }>();

  const RenderTable = () => {
    return (
      <CLoading loading={loadingFootball}>
        <Table>
          <Table.Head className="table-ranks">
            <Table.HeadCell>Day</Table.HeadCell>
            <Table.HeadCell>Hours</Table.HeadCell>
            <Table.HeadCell className="text-right">Owner</Table.HeadCell>
            <Table.HeadCell className="text-center">Score</Table.HeadCell>
            <Table.HeadCell>Guest</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {matches?.map((match: any, i: number) => {
              const day = new Date(match?.utcDate).toDateString()
              const time = new Date(match?.utcDate).toLocaleTimeString('en-US', {
                // en-US can be set to 'default' to use user's browser settings
                hour: '2-digit',
                minute: '2-digit',
              });
              // const hoursAndMinutes = time.getHours() + ":" + time.getMinutes();

              return (
                <Table.Row
                  key={i}
                  onClick={() => {
                    console.log();
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                >
                  <Table.Cell>{day}</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell className="text-right">
                    {match.homeTeam.name}
                  </Table.Cell>
                  <Table.Cell className="text-center">VS</Table.Cell>

                  <Table.Cell>{match.awayTeam.name}</Table.Cell>

                  <Table.Cell>---</Table.Cell>
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
            <ListCompetitionFake />
          </CLoading>
        </div>
        <div className="w-full my-3">{RenderTable()}</div>
      </div>
    </div>
  );
}

export default React.memo(Matches);
