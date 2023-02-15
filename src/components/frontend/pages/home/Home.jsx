import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./home.scss";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
