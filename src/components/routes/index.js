import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authRoutes } from "@/components/routes/authRoutes";
import { publicRoutes } from "@/components/routes/publicRoutes";
import { privateRoutes } from "@/components/routes/privateRoutes";
import { studentRoutes } from "@/components/routes/studentRoutes";
import { parentRoutes } from "@/components/routes/parentRoutes";

import { useSelector, useDispatch } from "react-redux";
import { accountUser } from "@/slice/authSlice";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");
  useEffect(() => {
    dispatch(accountUser()).then((res) => {});
  }, []);

  return (
    <Router>
      <Routes>
        {authRoutes.map((route, index) => {
          if (isAuth === "true") {
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

        {/* {privateRoutes.map((route, index) => {
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
        })} */}
        {isAuth === "true" && role === "admin" ? (
          privateRoutes.map((route, index) => {
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
          })
        ) : (
          <Route path="*" element={<Navigate to={"/login"} />} />
        )}
        {isAuth === "true" && role === "student" ? (
          studentRoutes.map((route, index) => {
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
          })
        ) : (
          <Route path="*" element={<Navigate to={"/login"} />} />
        )}
        {isAuth === "true" && role === "parent" ? (
          parentRoutes.map((route, index) => {
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
          })
        ) : (
          <Route path="*" element={<Navigate to={"/login"} />} />
        )}
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
      </Routes>
    </Router>
  );
}

export default App;
