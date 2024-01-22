import { Routes, Route } from "react-router-dom"

import Layout from "./components/Layout/Layout"
import MainPage from "./pages/MainPage/MainPage"
import Map from "./pages/Map/Map"
import News from "./pages/News/News"

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />}/>
        <Route path='map' element={<Map />} />
        <Route path='news' element={<News />} />
      </Route>
    </Routes> 
  )
}

export default App
