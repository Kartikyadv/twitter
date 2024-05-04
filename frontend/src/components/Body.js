import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Messages from "./Messages.js";
// import { SocketProvider } from "../utils/socket.js";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        // <SocketProvider>
          <Home />
        // </SocketProvider>
      ),
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
