import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "../pages/layout/HomeLayout";
import { Front } from "../pages/front";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AuthorLayout from "../pages/layout/AuthorLayout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "../reducers/useReducer";
import { Author } from "../pages/cms/author";

const AuthorPrivateRoute = ({ component }) => {
  let localUser = JSON.parse(localStorage.getItem("authUser")) ?? null;
  if (!localUser) {
    return <Navigate to="/login"></Navigate>;
  } else {
    let accessToken = localStorage.getItem("authToken");
    if (!accessToken) {
      localStorage.removeItem("authUser");
      return <Navigate to="/login"></Navigate>;
    } else {
      return component;
    }
  }
};

export const UserContext = createContext();

const RoutingComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <UserContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Front.HomePage />}></Route>
              <Route path="/register" element={<Front.RegisterPage />}></Route>
              <Route path="/login" element={<Front.LoginPage />}></Route>
            </Route>

            <Route path="/author" element={<AuthorPrivateRoute component={<HomeLayout />} />}>
              <Route index element={<Front.HomePage />}></Route>
              <Route path="write" element={<Author.CreatePost />}></Route>
              <Route path="posts/:authorName" element={<Author.ListPost />}></Route>
              <Route path="posts/:authorName/:id" element={<Author.UpdatePost />}></Route>
            </Route>

            <Route path="/posts" element={<HomeLayout />}>
              <Route index element={<Front.PostsPage />}></Route>
              {/* <Route path=":id" element={<Author.UpdatePost />}></Route> */}
              <Route path=":slug" element={<Front.ViewPost />}></Route>
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default RoutingComponent;
