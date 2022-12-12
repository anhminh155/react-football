import { Modal } from "flowbite-react";
import React from "react";

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
    // console.log(data);
    // console.log(data[0] );
    
  return (
    <Modal
      className="h-screen mb-1"
      show={isShow}
      size="7xl"
      onClose={() => onChangeModal(false)}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {}
        <div>
          <span>{data[0]?.competition?.name || ''}</span>
          <div className="img">{/* <img src={data} alt="" /> */}</div>
        </div>
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
