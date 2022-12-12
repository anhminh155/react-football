import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import CErrorPage from "./components/CErrorPage";
import CHeader from "./components/CHeader";
import Bracket from "./pages/home/Bracket";
import Rank from "./pages/home/Rank";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Layout = (): JSX.Element => {
  return (
    <React.Fragment>
      <CHeader />
      <Outlet />
    </React.Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <CErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/rank",
        element: <Rank />,
      },
      {
        path: "/bracket",
        element: <Bracket />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

root.render(
  <Provider store={store}>
    <App>
      <RouterProvider router={router} />
    </App>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
