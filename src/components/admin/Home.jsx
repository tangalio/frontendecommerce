import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
