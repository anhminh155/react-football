import React from 'react'
import CLoading from '../../components/CLoading';
import { useDispatchRoot, useSelectorRoot } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import ListCompetitionFake from './ListCompetitionFake';

type Props = {}

function Matches({}: Props) {
    const dispatch = useDispatchRoot()
    const {loadingFootball} = useSelectorRoot((state: RootState)=> state.football)
  return (
    <div className="mx-6 select-none">
      <div className="desktop:flex gap-x-4 mobile:inline">
        <div className="min-w-fit">
          <div className=" bg-[#01b243] text-white text-lg p-2 mt-3 border rounded-t-md w-full">
            BEST MATCHES
          </div>
          <CLoading loading={loadingFootball}>
            <ListCompetitionFake />
          </CLoading>
        </div>
        <div className="w-full">
          View right
        </div>
      </div>
    </div>
  )
}

export default React.memo(Matches)