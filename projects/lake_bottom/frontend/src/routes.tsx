import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Base from "./Base";
import ShowIndex from "./show/ShowIndex";
import ShowDetail from "./show/ShowDetail";
import SongDetail from "./song/SongDetail";
import SongIndex from "./song/SongIndex";
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
      {
        path: "song",
        element: <SongIndex />,
      },
      {
        path: "song/:id",
        element: <SongDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
