import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getSomeNews } from "../../state/someNewUrl/urlSlice";

import "./sideBar.scss"


const SideBar = () => {
  const [currentCategory, setCurrentCategory] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const category = pathArray[pathArray.length - 1];
    setCurrentCategory(category);
  }, [location]);

  const transitionCategory = (newCategory) => {
    navigate(`${newCategory}`);
  };

  useEffect(() => {
    switch (currentCategory) {
      case "sport":
        dispatch(getSomeNews(1));
        break;
      case "style":
        dispatch(getSomeNews(2));
        break;
      case "tv":
        dispatch(getSomeNews(3));
        break;
    }
  }, []);


  return (
    <div className="side-bar">
      <div className="container">
        <div className="side-bar-wrap">
          <div className="side-bar-wrap__bottom">
            <nav className="side-bar-wrap__bottom-nav">
              <ul className="side-bar-wrap__bottom-nav-list">
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => transitionCategory("events")}>События</a>
                </li>
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => {transitionCategory("style")}}>Стиль</a>
                </li>
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => {transitionCategory("sport")}}>Спорт</a>
                </li>
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => transitionCategory("health")}>Здоровье</a>
                </li>
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => transitionCategory("rest")}>Отдых</a>
                </li>
                <li className="side-bar-wrap__bottom-nav-list__link">
                  <a onClick={() => {transitionCategory("tv")}}>TV</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
