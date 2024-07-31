import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuth } from "./routes/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import ListPage from "./routes/ListPage/ListPage";
import SinglePage from "./routes/SinglePage/SinglePage";
import Profile from "./routes/Profile/Profile";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(setAuth(true));
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage /> },
        { path: "/:id", element: <SinglePage /> },
        { path: "/signin", element: <Login /> },
        { path: "/signup", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children: [{ path: "/profile", element: <Profile /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
