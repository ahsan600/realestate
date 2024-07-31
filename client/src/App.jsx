import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuth } from "./routes/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import ListPage from "./routes/ListPage/ListPage";
import SinglePage from "./routes/SinglePage/SinglePage";
import Profile from "./routes/Profile/Profile";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";
import Page404 from "./routes/404Page/Page404";
import UpdateProfile from "./routes/UpdateProfile/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "list", element: <ListPage /> },
        { path: "list/:id", element: <SinglePage /> },
        { path: "signin", element: <Login /> },
        { path: "signup", element: <Register /> },
      ],
    },
    {
      path: "profile",
      element: <RequiredAuth />,
      children: [
        { path: "", element: <Profile /> },
        { path: "update-user", element: <UpdateProfile /> },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
