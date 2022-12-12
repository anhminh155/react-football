import { Dropdown, Table } from "flowbite-react";
import React, { useState } from "react";
import CLoadingPage from "../../components/CLoadingPage";
import { useScrollBlock } from "../../hooks/useScrollBlock";
import {
  fetchStandingsWorldCup,
  fetchTeamMatchesWorldCup,
} from "../../redux/controller/worldCup.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TeamWorldCup } from "../../types/football-world-cup";
import ModalTeamMatches from "./ModalTeamMatches";

type Props = {};

function Rank({}: Props) {
  const dispatch = useDispatchRoot();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loading, matches, standingsTotal } = useSelectorRoot(
    (state: RootState) => state.worldCup
  );
  const [selectTeam, setSelectTeam] = useState<any | undefined>(
    undefined
  );
  const year = standingsTotal?.season.startDate.split("-")[0];
  const standings = standingsTotal?.standings;
  const [blockScroll, allowScroll] = useScrollBlock();

  React.useEffect(() => {
    dispatch(fetchStandingsWorldCup());
  }, []);
  React.useEffect(() => {
    if (showModal) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [showModal]);

  const RenderTable = () => {
    return standings?.map((standing, index) => {
      const nameGroup = standing.group.split("_");
      return (
        <Table key={index} className="mb-4">
          <Table.Head className="table-ranks">
            <Table.HeadCell className="w-40">{`${nameGroup[0]} ${nameGroup[1]}`}</Table.HeadCell>
            <Table.HeadCell className="">MP</Table.HeadCell>
            <Table.HeadCell>W</Table.HeadCell>
            <Table.HeadCell>D</Table.HeadCell>
            <Table.HeadCell>L</Table.HeadCell>
            <Table.HeadCell>GF</Table.HeadCell>
            <Table.HeadCell>GA</Table.HeadCell>
            <Table.HeadCell>GD</Table.HeadCell>
            <Table.HeadCell>Pts</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {standing?.table.map((tb, i) => {
              return (
                <Table.Row
                  key={i}
                  onClick={() => {
                    setShowModal(true);
                    setSelectTeam(tb?.team);
                    dispatch(fetchTeamMatchesWorldCup(tb.team.id));
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tb.team.name || ""}
                  </Table.Cell>
                  <Table.Cell>{tb.playedGames}</Table.Cell>
                  <Table.Cell>{tb.won}</Table.Cell>
                  <Table.Cell>{tb.draw}</Table.Cell>
                  <Table.Cell>{tb.lost}</Table.Cell>
                  <Table.Cell>{tb.goalsFor}</Table.Cell>
                  <Table.Cell>{tb.goalsAgainst}</Table.Cell>
                  <Table.Cell>{tb.goalsFor - tb.goalsAgainst}</Table.Cell>
                  <Table.Cell>{tb.points}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    });
  };

  return loading ? (
    <CLoadingPage />
  ) : (
    <div className="mx-6">
      <div className="inline-block bg-[#01b243] text-white text-lg p-2 my-3 border rounded-md">
        <div className="flex">
          <span className="pr-1">Bảng xếp hạng bóng đá World Cup:</span>
          <span>{year}</span>
          {/* <Dropdown inline={true} label={year} dismissOnClick={false}>
            <Dropdown.Item>2014</Dropdown.Item>
            <Dropdown.Item>2014</Dropdown.Item>
            <Dropdown.Item>2014</Dropdown.Item>
          </Dropdown> */}
        </div>
      </div>
      <div>
        {RenderTable()}
        <ModalTeamMatches
          title={`${selectTeam?.name} national football team`}
          data={matches}
          isShow={showModal}
          onChangeModal={setShowModal}
        />
      </div>
    </div>
  );
}

export default React.memo(Rank);
