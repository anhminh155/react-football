import { Tooltip, TooltipProps } from "flowbite-react";
import React from "react";

function CTooltip({ ...other }: TooltipProps):JSX.Element {
  return (
    <div className="box-tooltip">
      <Tooltip {...other} arrow={false}/>
    </div>
  );
}

export default React.memo(CTooltip);
