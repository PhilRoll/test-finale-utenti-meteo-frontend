import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Registration } from "../pages/Registration/Registration";
import { NotFound } from "../pages/NotFound/NotFound";
import {AuthContextProvider} from "../contexts/AuthContextProvider"
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/MainLayout/Layout";
import {UserProfile} from "../pages/UserProfile/UserProfile";
import { Search } from "../pages/Search/Search";


export const router = createBrowserRouter([
    {
      element: <AuthContextProvider><Layout/></AuthContextProvider>,
      children:[
        {
          path: "/",
          children: [
            {
              path: "",
              element: <Home />
            },
            {
              path: "/login",
              element: <Login />
            },
            {
              path:"/register",
              element: <Registration/>
            },
            {
              path:"/search",
              element: <Search/>
            },

          ]
        },
        {
          path: "/user",
          children:[
            {
              path: "/userprofile",
              element: <UserProfile/>
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: <NotFound/>
    }
  ]);