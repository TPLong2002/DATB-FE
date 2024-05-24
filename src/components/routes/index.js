import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authRoutes } from "@/components/routes/authRoutes";
import { publicRoutes } from "@/components/routes/publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { useSelector, useDispatch } from "react-redux";
import { accountUser } from "@/slice/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountUser()).then((res) => {
      localStorage.setItem("isAuth", res.payload.isAuth);
    });
  }, []);
  const auth = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("isAuth");
  return (
    <Router>
      <Routes>
        {authRoutes.map((route, index) => {
          if (isAuth === "true" || isAuth == undefined) {
            return (
              <Route
                key={index}
                path="*"
                element={<Navigate to={`${localStorage.getItem("prePath")}`} />}
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          if (isAuth === "true") {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <route.layout>
                    <route.component />
                  </route.layout>
                }
              />
            );
          }
          return (
            <Route key={index} path="*" element={<Navigate to={"/login"} />} />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
