import React from "react";
import "./App.css";
import { Props } from "./types/define";

function App(props:Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      {props.children}
    </div>
  );
}

export default React.memo(App);
