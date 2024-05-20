import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Base from "./components/Base";
import ShowIndex from "./components/ShowIndex";
import ShowDetail from "./components/ShowDetail";
import ErrorPage from "./components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Base />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "show",
        element: <ShowIndex />,
      },
      {
        path: "show/:id",
        element: <ShowDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
