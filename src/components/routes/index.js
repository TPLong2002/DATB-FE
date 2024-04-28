import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authRoutes } from "@/components/routes/authRoutes";
import { publicRoutes } from "@/components/routes/publicRoutes";
function App() {
  console.log(authRoutes);
  return (
    <Router>
      <Routes>
        {authRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
