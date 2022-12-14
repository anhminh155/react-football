import { Modal, Tooltip } from "flowbite-react";
import React from "react";
import Utils from "../../common/utils";
import CLoading from "../../components/CLoading";
import CTooltip from "../../components/CTooltip";
import { fetchHead2HeadFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
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
  const { loadingModalFootball, competitionsStandings } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const dispatch = useDispatchRoot();

  return (
    <Modal
      onBlur={() => console.log("out")}
      show={isShow}
      size="4xl"
      onClose={() => onChangeModal(false)}
    >
      <Modal.Header>
        <div className="font-bold uppercase">{title}</div>
        <div className="">
          {competitionsStandings
            ? `${competitionsStandings?.competition.name} (${Utils.formatDate(
                competitionsStandings?.season.startDate
              )} - ${Utils.formatDate(competitionsStandings?.season.endDate)})`
            : ""}
        </div>
      </Modal.Header>
      <Modal.Body>
        <CLoading loading={loadingModalFootball} background="#fff">
          {data?.length == 0 ?? data == undefined ? (
            <div>Data not Found in database</div>
          ) : (
            <div className="grid mobile:grid-cols-1 desktop:grid-cols-2 gap-4 auto-rows-min	overflow-auto h-[600px]">
              {data?.map((e: any, i: number) => {
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
                  <div
                    key={i}
                    onClick={() => {
                      console.log(e);
                      dispatch(fetchHead2HeadFootball(e.id));
                    }}
                    className="border p-2 rounded-md h-fit hover:bg-gray-200 hover:cursor-pointer"
                  >
                    <h2 className="pb-2 font-bold">
                      {Utils.formatDate(e.utcDate)}
                    </h2>
                    <div className="flex justify-between">
                      <div className="awayTeam flex items-center gap-2 pb-2">
                        <img
                          className="h-10 w-10"
                          src={urlAwayTeam}
                          alt={e.awayTeam.name}
                        />
                        <span className="cursor-pointer">
                          {e.awayTeam.name}
                        </span>
                      </div>

                      <span className="pr-1">
                        {e.score.fullTime.awayTeam ?? "coming"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="homeTeam flex items-center gap-2">
                        <img
                          className="h-10 w-10"
                          src={urlHomeTeam}
                          alt={e.homeTeam.name}
                        />
                        <span className="cursor-pointer">
                          {e.homeTeam.name}
                        </span>
                      </div>
                      <span className="pr-1">
                        {e.score.fullTime.homeTeam ?? "coming"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CLoading>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ModalTeamMatches);
