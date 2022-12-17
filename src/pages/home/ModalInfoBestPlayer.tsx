import React from "react";
import { Modal, ModalProps } from "flowbite-react";
import { IPlayerMatches } from "../../types/football-player-matches";
import { format } from "date-fns";
import { useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface IInfoBestPlayer extends ModalProps {
  rootData: IPlayerMatches;
  player?: any;
}

function ModalInfoBestPlayer({ player, rootData, ...other }: IInfoBestPlayer) {
  const { competitionsStandings } = useSelectorRoot(
    (state: RootState) => state.football
  );
  console.log("Render InfoBestPlayer");
  console.log(rootData);
  console.log(player);
  console.log("----------");

  return (
    <Modal {...other}>
      <Modal.Header>
        <div className="font-bold">{rootData.player.name}</div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="">
            <span className="font-semibold pr-1">Name:</span>
            <span>{rootData.player.name}</span>
          </div>

          <div className="">
            <span className="font-semibold pr-1">LastName:</span>
            <span>
              {format(new Date(rootData.player.dateOfBirth!), "dd-MM-yyyy")}
            </span>
          </div>
          <div className="">
            <span className="font-semibold pr-1">Country:</span>
            <span>{rootData.player.countryOfBirth}</span>
          </div>
        </div>
        <div className="py-2 text-lg font-semibold">{`${rootData.matches.length} ${competitionsStandings.competition.name} Matches`}</div>
        <div className="overflow-auto h-[450px]">
          {rootData.matches.map((e: any, i: number) => {
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
                  // console.log(e);
                  // console.log(showHead2Head);
                  // if (!showHead2Head) {
                  //   setShowHead2Head(true);
                  //   dispatch(fetchHead2HeadFootball(e.id));
                  // }
                }}
                className="relative border p-2 rounded-md h-fit hover:bg-gray-200 hover:cursor-pointer mb-2"
              >
                {e.status === "POSTPONED" && (
                  <div className="absolute top-0 right-0 bg-orange-300 opacity-30 w-full h-full font-bold text-lg flex items-center justify-center">
                    <span className="-rotate-12	">POSTPONED</span>
                  </div>
                )}
                <span className="pb-2 font-bold">
                  {/* {e.competition.name} /{" "} */}
                  {format(new Date(e.utcDate), "HH:mm dd-MM-yyyy")}
                </span>

                <h2 className="pb-2 font-semibold text">
                  {/* {Utils.formatDate(e.utcDate)} */}
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
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ModalInfoBestPlayer);
