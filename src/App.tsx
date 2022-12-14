import React from "react";
import "./App.css";
import { useDispatchRoot, useSelectorRoot } from "./redux/hooks";
import { RootState } from "./redux/store";
import { Props } from "./types/define";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setMessage } from "./redux/controller/app.slice";

function App(props: Props) {
  const { message } = useSelectorRoot((state: RootState) => state.app);
  const dispatch = useDispatchRoot();
  React.useEffect(() => {
    const notify = () => toast.warning(message, { autoClose: 30000 });
    if (message.length > 0) {
      notify();
      dispatch(setMessage(""));
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
