import { Spinner } from "flowbite-react";
import React from "react";

type Props = {};

function CLoadingPage({}: Props) {
  return (
    <div className="h-[calc(100vh-156px)] flex items-center justify-center">
      <Spinner aria-label="Default status example" />
    </div>
  );
}

export default React.memo(CLoadingPage);
