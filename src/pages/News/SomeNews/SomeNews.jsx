import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import ImageWithZoom from "../../../components/ImageWithZoom/ImageWithZoom"

import { MdOutlineAccessTime } from "react-icons/md"
import "../someNews.scss"

const SportNews = () => {
  const [someNewsData, setSomeNewsData] = useState([])
  const location = useLocation()
  const currentPath = location.pathname

  const pathArray = currentPath.split("/")
  const currentCategory = pathArray[pathArray.length - 1]

  useEffect(() => {
    const getSomeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/newsData/`)

        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].name_en === "sport" &&
            currentCategory === "sport"
          ) {
            setSomeNewsData(response.data[i].news)
            break
          } else if (
            response.data[i].name_en === "style" &&
            currentCategory === "style"
          ) {
            setSomeNewsData(response.data[i].news)
            break
          } else if (
            response.data[i].name_en === "tv" &&
            currentCategory === "tv"
          ) {
            setSomeNewsData(response.data[i].news)
            break
          }
        }
      } catch (e) {
        console.error(`error: ${e}`)
      }
    }

    getSomeData();
  }, [currentCategory])

  const topFourNews = []
  const otherNews = []

  // get top 4 news
  for (let i = 1; i < 4; i++) {
    topFourNews.push(someNewsData[i])
  }
  // get others news
  for (let i = 4; i < someNewsData.length; i++) {
    otherNews.push(someNewsData[i])
  }

  return (
    <div className="news">  
      <div className="container">
        <div className="news-wrap">
          {someNewsData.length > 0 && (
            <div className="news-wrap__top4">
              <div
                className="news-wrap__top4-left"
                style={{
                  backgroundImage: `url('${someNewsData[0].photo}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="news-wrap__top4-left-info">
                  <div className="news-wrap__top4-left-info__type">
                    {someNewsData[0].category}
                  </div>
                  <div className="news-wrap__top4-left-info__time">
                    <MdOutlineAccessTime className="news-wrap__top4-left-info__time_icon" />
                    <div className="news-wrap__top4-left-info__time_value">
                      39 минут
                    </div>
                  </div>
                </div>
                <Link to={`${someNewsData[0].id}`} className="news-wrap__top4-left-desc">
                  {someNewsData[0].title}
                </Link>
              </div>

              <div className="news-wrap__top4-right">
                {topFourNews.map((data) => (
                  <Top4RightCard key={data.id} data={data} />
                ))}
              </div>
            </div>
          )}

          <div className="news-wrap__others">
            {otherNews.map((data) => (
              <OthersNewsCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OthersNewsCard = ({ data }) => {
  return (
     <Link to={`${data.id}`} className="news-wrap__others-card">
       <ImageWithZoom
         imgUrl={data.photo}
         classInner={"news-wrap__others-card-img__block"}
         classOut={"news-wrap__others-card-img"}
       />
       <div className="news-wrap__others-card-info">
         <div className="news-wrap__others-card-info__head">
           <div className="news-wrap__others-card-info__head_type">
             {data.category} &#8226;
           </div>
           <div className="news-wrap__others-card-info__head_time">2 ч</div>
         </div>
         <div className="news-wrap__others-card-info__desc">{data.title}</div>
       </div>
     </Link>
  )
}

const Top4RightCard = ({ data }) => {
  return (
    <Link to={`${data.id}`} className="news-wrap__top4-right-card">
      <ImageWithZoom
        imgUrl={data.photo}
        classInner={"news-wrap__top4-right-card__img-block"}
        classOut={"news-wrap__top4-right-card__img"}
      />
      <div className="news-wrap__top4-right-card__info">
        <div className="news-wrap__top4-right-card__info-head">
          <div className="news-wrap__top4-right-card__info-head-type">
            {data.category} &#8226;
          </div>
          <div className="news-wrap__top4-right-card__info-head-time">
            20 мин
          </div>
        </div>
        <p className="news-wrap__top4-right-card__info-desc">
          {data.title}
        </p>
      </div>
    </Link>
  )
}

export default SportNews