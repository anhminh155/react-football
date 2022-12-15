import { Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CLoading from "../../components/CLoading";
import { fetchMatchesFootball } from "../../redux/controller/football.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Props } from "../../types/define";
import { IFiltersAPI } from "../../types/football-type";
import { Match } from "../../types/head2Head.football";
import ListCompetitionFake from "./ListCompetitionFake";

function Matches({}: Props) {
  const dispatch = useDispatchRoot();
  const { loadingFootball, rootMatches } = useSelectorRoot(
    (state: RootState) => state.football
  );
  const { codeMatches } = useParams<{
    codeMatches?: string;
  }>();
  const [numberPagination, setNumberPagination] = useState<number>(1);
  const [data, setData] = useState<any>(rootMatches.matches);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const params: IFiltersAPI = {
      competitions: codeMatches!,
      status: "SCHEDULED",
    };
    if (checked) {
      delete params.status;
      dispatch(fetchMatchesFootball(params));
    } else {
      dispatch(fetchMatchesFootball(params));
    }
  }, []);

  console.log(data);
  console.log(rootMatches.matches);
  

  useEffect(() => {
    rootMatches.matches.length >= 10
      ? setData(handelPagination(rootMatches.matches, 10, 1))
      : setData(rootMatches.matches);
    setNumberPagination(1);
  }, [rootMatches.matches]);

  const handelPagination = (
    array: any,
    page_size: number,
    page_number: number
  ) => {
    return array.slice(
      page_number * page_size,
      page_number * page_size + page_size
    );
  };

  const RenderTable = () => {
    return (
      <CLoading loading={loadingFootball}>
        <div className="flex justify-between items-center mb-3">
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
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300
             dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
               after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
            />
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {`All(Matches/Live)`}
            </span>
          </label>

          <Pagination
            className="-mt-2"
            currentPage={numberPagination}
            onPageChange={(e) => {
              if (rootMatches.count >= 10) {
                setData(handelPagination(rootMatches.matches, 10, e));
                setNumberPagination(e);
              }
            }}
            showIcons={true}
            totalPages={
              rootMatches.count >= 10 ? Math.floor(rootMatches.count / 10) : 1
            }
          />
        </div>
        <Table>
          <Table.Head className="table-ranks">
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Day</Table.HeadCell>
            <Table.HeadCell>Hours</Table.HeadCell>
            <Table.HeadCell className="text-right">Owner</Table.HeadCell>
            <Table.HeadCell className="text-center">Score</Table.HeadCell>
            <Table.HeadCell>Guest</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((match: Match, i: number) => {
              const day = new Date(match?.utcDate).toDateString();
              const time = new Date(match?.utcDate).toLocaleTimeString(
                "en-US",
                {
                  // en-US can be set to 'default' to use user's browser settings
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              // const hoursAndMinutes = time.getHours() + ":" + time.getMinutes();

              return (
                <Table.Row
                  key={i}
                  onClick={() => {
                    console.log();
                  }}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 w-40 hover:bg-[#65bc85] hover:font-bold hover:cursor-pointer hover:text-white"
                >
                  <Table.Cell>{(numberPagination - 1) * 10 + i + 1}</Table.Cell>
                  <Table.Cell>{day}</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell className="text-right">
                    {match.homeTeam.name}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {match.score.fullTime.homeTeam
                      ? `${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}`
                      : "VS"}
                  </Table.Cell>

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
