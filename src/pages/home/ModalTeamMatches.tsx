import { Modal, Spinner } from "flowbite-react";
import React from "react";
import Utils from "../../common/utils";
import { useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";

import { Props } from "../../types/define";

interface IModalTeamMatches extends Props {
  title: string;
  data: any;
  isShow: boolean;
  onChangeModal: any;
}

function ModalTeamMatches({
  title,
  data,
  isShow,
  onChangeModal,
}: IModalTeamMatches) {
  const { loadingFootball, competitionsStandings } = useSelectorRoot(
    (state: RootState) => state.football
  );

  const findTeam = (idTeam: number): any => {
    const findGroup = competitionsStandings?.standings.find(
      (standings) => standings.group === data[0]?.group
    );
    const findTeam = findGroup?.table.find(
      (table: any) => table.team.id === idTeam
    );
    return findTeam;
  };

  return (
    <Modal
      // draggable={true}
      className="h-8"
      show={isShow}
      size="3xl"
      onClose={() => onChangeModal(false)}
    >
      <Modal.Header>
        <span className="font-bold uppercase">{title}</span>
      </Modal.Header>
      <Modal.Body>
        {loadingFootball ? (
          <div className="h-60 flex justify-center items-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : (
          <React.Fragment>
            <div className="font-bold pb-2">
              {/* {data[0]?.competition?.name ?? ""} */}
            </div>
            <div className="grid mobile:grid-cols-1 desktop:grid-cols-2 gap-4">
              {data?.map((e: any, i: number) => {
                const findGroup = competitionsStandings?.standings.find(
                  (standings) => standings.group === data[0]?.group
                );
                const findTeamAwayTeam = findGroup?.table.find(
                  (table: any) => table.team.id === e.awayTeam.id
                );
                const findTeamHomeTeam = findGroup?.table.find(
                  (table: any) => table.team.id === e.homeTeam.id
                );

                const urlAwayTeam = findTeamAwayTeam?.team.crestUrl;
                const urlHomeTeam = findTeamHomeTeam?.team.crestUrl;

                return (
                  <div key={i} className="border p-2 rounded-md">
                    <h2 className="pb-2 font-bold">
                      {Utils.formatDate(e.utcDate)}
                    </h2>
                    <div className="flex justify-between">
                      <div className="awayTeam flex items-center gap-2 pb-2">
                        <img className="h-10 w-10" src={urlAwayTeam} alt="" />
                        <span>{e.awayTeam.name}</span>
                      </div>
                      <div>
                        <span>{e.score.fullTime.awayTeam ?? "coming"}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="homeTeam flex items-center gap-2">
                        <img className="h-10 w-10" src={urlHomeTeam} alt="" />
                        <span>{e.homeTeam.name}</span>
                      </div>
                      <span>{e.score.fullTime.homeTeam ?? "coming"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
        {/* <div className="space-y-1">{`${JSON.stringify(data)}`}</div> */}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={onClick}>I accept</Button>
        <Button color="gray" onClick={onClick}>
          Decline
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default React.memo(ModalTeamMatches);
