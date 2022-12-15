import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import { fetchBestScorersCompetitionsFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";

interface IBestPlayer extends Props {
  competition: string | undefined;
}

function BestPlayer({ competition }: IBestPlayer) {
  const dispatch = useDispatchRoot();
  const { bestScorersCompetitions, loadingFootball } = useSelectorRoot(
    (state: RootState) => state.football
  );
  useEffect(() => {
    dispatch(fetchBestScorersCompetitionsFootball(competition || ""));
  }, []);

  const RenderTable = () => {
    return (
      <Table>
        <Table.Head className="table-ranks">
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Birth day</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
          <Table.HeadCell>Team</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Goals</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {bestScorersCompetitions?.scorers?.map((scorer: any, i: number) => {
            return (
              <Table.Row
                key={i}
                onClick={() => {
                  console.log(scorer);
                }}
                className="font-bold bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
              >
                <Table.Cell className="">{scorer.player.name}</Table.Cell>
                <Table.Cell className="">
                  {Utils.formatDate(scorer.player.dateOfBirth)}
                </Table.Cell>
                <Table.Cell className="">
                  {Utils.getAge(scorer.player.dateOfBirth)}
                </Table.Cell>
                <Table.Cell className="">{scorer.team.name}</Table.Cell>
                <Table.Cell className="">{scorer.player.position}</Table.Cell>
                <Table.Cell className="">{scorer.numberOfGoals}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  return (
    <CLoading loading={loadingFootball}>
      <div className="min-h-[300px]">{RenderTable()}</div>
    </CLoading>
  );
}

export default React.memo(BestPlayer);
