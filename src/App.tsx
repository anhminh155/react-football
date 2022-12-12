import React from "react";
import "./App.css";
import { useDispatchRoot, useSelectorRoot } from "./redux/hooks";
import { RootState } from "./redux/store";
import { Props } from "./types/define";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setMessageWC } from "./redux/controller/worldCup.slice";

function App(props: Props) {
  const { message } = useSelectorRoot((state: RootState) => state.worldCup);
  const dispatch = useDispatchRoot()
  React.useEffect(() => {
    const notify = () => toast.warning(message);
    if (message.length > 0) {
      notify();
      dispatch(setMessageWC(''))
    }
  }, [message]);
  return (
    <div className="">
      <ToastContainer />
      {props.children}
    </div>
  );
}

export default React.memo(App);
