import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import ImageWithZoom from '../../../components/ImageWithZoom/ImageWithZoom'

import { IoEyeOutline } from "react-icons/io5"
import { FaHeart } from "react-icons/fa"
import { IoIosShareAlt } from "react-icons/io"
import { FaComments } from "react-icons/fa6"

import './moreNews.scss'


const MoreNews = () => {
   const [data, setData] = useState({})
   const [otherNews, setOtherNews] = useState([])
   const [createdAtNews, setCreatedAtNews] = useState('')
   const { newsId } = useParams()

   const currentUrl = window.location.href
   const parts = currentUrl.split('/')
   const category = parts[parts.length - 2]
   let apiUrl = ''

   useEffect(() => {
      switch (category) {
         case 'sport': 
            apiUrl = 'http://localhost:3001/newsData/1/'
            break
         case 'style': 
            apiUrl = 'http://localhost:3001/newsData/2/'
            break
         case 'tv': 
            apiUrl = 'http://localhost:3001/newsData/3/'
            break
            
      }

      const getMoreNewsData = async () => {
         try {
            const response = await axios.get(apiUrl)

            if (response.status !== 200) {
               console.log('server error');
               return null;
            }
            
            const currentNews = response.data.news.find(item => item.id === Number(newsId))
            setData(currentNews)
            setOtherNews(response.data.news)

            /**
             * @returns {string} date and time - format: "2024-01-30 | 23:41"
             */
            setCreatedAtNews(() => {
               let date = '',
                  time = ''
               
               for (let i = 0; i < currentNews.created_at.length; i++) {
                  if (i >= 0 && i <= 9) {
                     date += currentNews.created_at[i]
                  } else if (i >= 11 && i <= 15) {
                     time += currentNews.created_at[i]
                  }
               }
         
               return `${date} | ${time}`
            })
         } catch (e) {
            console.error(`server error: ${e}`)
         }
      }

      getMoreNewsData()
   }, [newsId])


   const textHelperForDescription = ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur, temporibus illo! Consequatur consequuntur mollitia repudiandae autem rem iure tempore a? Quos, non debitis eius officia enim eum animi saepe odit facilis labore blanditiis nam tempore consequuntur temporibus, et harum sapiente.'

   return (
      <div className='more'>
         <div className='container'>
            <section className='more-wrap'>
               <div className='more-wrap-content'>
                  <div className='more-wrap-content__title'>{data.title}</div>
                  <div 
                     className='more-wrap-content__img' 
                     style={{backgroundImage: `url('${data.photo}')`}}>
                  </div>
                  <div className='more-wrap-content__info'>
                     <div className='more-wrap-content__info-top'>
                        <div className='more-wrap-content__info-top_by'>By <b>Live.kg <span className='helper'>|</span></b></div>
                        <div className='more-wrap-content__info-top_date'>Опубликовано <b>{createdAtNews}</b></div> 
                     </div>

                     <div className='more-wrap-content__info_type'>
                        <div className='more-wrap-content__info_type-category'>{data.category}</div>
                        <div className='more-wrap-content__info_type-count-views'>
                           <IoEyeOutline className='more-wrap-content__info_type-count-views-icon' />
                           <p>{data.count_views}</p>
                        </div>
                        <div className='more-wrap-content__info_type-count-likes'>
                           <FaHeart className='more-wrap-content__info_type-count-likes-icon' />
                           <p>{data.count_likes}</p>
                        </div>
                     </div>
                  </div>
                  <div className='more-wrap-content__share'>
                     <div className='more-wrap-content__share-btn'>
                        <IoIosShareAlt className='more-wrap-content__share-btn_icon' />
                        <div className='more-wrap-content__share-btn_title'>Поделиться статьей</div>
                     </div>
                     <div className='more-wrap-content__share-comment'>
                        <FaComments className='more-wrap-content__share-comment_icon' />
                        <div className='more-wrap-content__share-comment_title'>Комментарий</div>
                     </div>
                  </div>
                  <div className='more-wrap-content__desc'>
                     <p>{data.description}</p>
                     <p>{textHelperForDescription}</p>
                  </div>
               </div>
            </section>
            <section className='more-section'>
               <h3 className='more-section__title'>Рекомендуется для вас</h3>
               <div className='more-recommended'>
                  {otherNews.map(item => 
                     <OthersNewsCard 
                        key={item.id} 
                        data={item} 
                     />
                  )}
               </div>
            </section>
            {/* ==== comment component ==== */}

         </div>
      </div>
   )
}

const OthersNewsCard = ({ data }) => {
   const title = data.title.slice(0, 60)
   const navigate = useNavigate()

   const handleClickMoreNews = (e) => {
      e.preventDefault()
      navigate(`${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/${data.id}`)
   }

   return (
      <Link
         to={`${data.id}`}
         className="news-wrap__others-card"
         onClick={handleClickMoreNews}>
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
            <div className="news-wrap__others-card-info__desc">{title}...</div>
         </div>
      </Link>
   )
}

export default MoreNews