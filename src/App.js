
import LoginUser from "./components/frontend/pages/login/Login";
import LoginAdmin from "./components/admin/Login";
import Registered from "./components/frontend/pages/registered/Registered";
import List from "./components/frontend/pages/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import PublicRoute from "./PublicRoute";
import publicRoutesList from "./routes/Publicroutelist";
import axios from "axios";
import AdminPrivateRoute from "./AdminPrivateRoute";
import routes from "./routes/routes";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Registered />} />
          <Route element={<AdminPrivateRoute />} >
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route element={<PublicRoute />} >
            {publicRoutesList.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route> */}
          <Route path="/">
            <Route path="login" element={<LoginUser />} />
             <Route path="register" element={<Registered />} />
            <Route element={<PublicRoute />} >
              {publicRoutesList.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          </Route>

          <Route path="/admin" >
            <Route path="login" element={<LoginAdmin />} />
            <Route element={<AdminPrivateRoute />} >
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
