import { Spinner } from "flowbite-react";
import React from "react";

type Props = {};

function CLoadingPage({}: Props) {
  return (
    <div className="h-[calc(100vh-156px)] flex items-center justify-center">
      <div className="box-football">
        <div className="shadow" />
        <div className="gravity">
          <div className="ball" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(CLoadingPage);
