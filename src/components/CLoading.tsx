import { Spinner } from "flowbite-react";
import React from "react";
import { Props } from "../types/define";

interface ICLoading extends Props {
  loading?: boolean;
  background?: string
}
function CLoading({ loading = false, background = '#4cc67a36', children }: ICLoading) {
  return (
    <div className="relative">
      <div>{children}</div>
      {loading ? (
        <div className={`flex items-center justify-center h-full w-full absolute top-0 bg-[#05b24442]`}>
          <Spinner aria-label="Medium sized spinner example" size="md" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(CLoading);
