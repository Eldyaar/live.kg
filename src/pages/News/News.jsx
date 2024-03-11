import { Outlet, Route, Routes } from "react-router-dom";

import SideBar from "../../components/SideBar/SideBar";
import ContentNews from "../../components/ContentNews/ContentNews";

import "./news.scss";

const News = () => {
  return (
    <section className="news">
      <div className="news-wrap">
        <SideBar />
        <Routes>
          <Route path="/" element={<ContentNews />} />
        </Routes>
        <Outlet />
      </div>
    </section>
  );
};

export default News;
