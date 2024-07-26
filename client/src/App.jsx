import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout/Layout";
import HomePage from "./routes/HomePage/HomePage";
import ListPage from "./routes/ListPage/ListPage";
import SinglePage from "./routes/SinglePage/SinglePage";
import Login from "./routes/Login/Login";
import Profile from "./routes/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage /> },
        { path: "/:id", element: <SinglePage /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
