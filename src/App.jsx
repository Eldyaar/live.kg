import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import Map from "./pages/Map/Map";
import News from "./pages/News/News";
import SomeNews from "./pages/News/SomeNews/SomeNews";
import MoreNews from "./pages/News/MoreNews/moreNews";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="map" element={<Map />} />
        <Route path="news/*" element={<News />}>
          <Route path="news/:newsId" element={<MoreNews />} />
          <Route path="events" element={<div>Events</div>} />
          <Route path="events/:newsId" element={<div>Events</div>} />
          <Route path="style" element={<SomeNews />} />
          <Route path="style/:newsId" element={<MoreNews />} />
          <Route path="sport" element={<SomeNews />} />
          <Route path="sport/:newsId" element={<MoreNews />} />
          <Route path="health" element={<div>health</div>} />
          <Route path="health/:newsId" element={<div>health</div>} />
          <Route path="rest" element={<div>rest</div>} />
          <Route path="rest/:newsId" element={<div>rest</div>} />
          <Route path="tv" element={<SomeNews />} />
          <Route path="tv/:newsId" element={<MoreNews />} />
          <Route path="it" element={<div>it</div>} />
          <Route path="it/:newsId" element={<div>it</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
