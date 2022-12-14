import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CLoading from "../../components/CLoading";
import { useScrollBlock } from "../../hooks/useScrollBlock";
import {
  fetchCompetitionStandingsFootball,
  fetchCompetitionTierFootball,
  fetchTeamMatchesCompetitionsFootball,
  ITeamMatches,
} from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import ListCompetition from "./ListCompetition ";
import ModalTeamMatches from "./ModalTeamMatches";
import TableStandings from "./TableStandings";

function Rankings({}: Props) {
  const dispatch = useDispatchRoot();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { teamMatches, loadingFootball } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const [selectTeam, setSelectTeam] = useState<any | undefined>(undefined);
  const [blockScroll, allowScroll] = useScrollBlock();

  const { competitionCode } = useParams<{
    competitionCode?: string;
  }>();

  React.useEffect(() => {
    dispatch(fetchCompetitionStandingsFootball(competitionCode!));
    dispatch(fetchCompetitionTierFootball("TIER_ONE"));
  }, []);

  React.useEffect(() => {
    if (showModal) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [showModal]);

  return (
    <div className="mx-6 select-none">
      <div className="desktop:flex gap-x-4 mobile:inline">
        <div className="min-w-fit">
          <div className=" bg-[#01b243] text-white text-lg p-2 mt-3 border rounded-t-md w-full">
            ALL TOURNAMENTS
          </div>
          <CLoading loading={loadingFootball}>
            <ListCompetition />
          </CLoading>
        </div>
        <div className="w-full">
          <TableStandings
            onSelectTable={(e: any) => {
              setSelectTeam(e.team);
              setShowModal(true);
              const param: ITeamMatches = {
                idTeam: e.team.id,
                competition: competitionCode!,
              };
              dispatch(fetchTeamMatchesCompetitionsFootball(param));
            }}
          />
          <ModalTeamMatches
            title={selectTeam?.name}
            data={teamMatches}
            isShow={showModal}
            onChangeModal={setShowModal}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Rankings);
