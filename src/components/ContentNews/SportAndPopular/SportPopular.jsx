import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

import './sportPopular.scss'
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

/*
const popularNewsData = [
   {
      id: 1,
      category: 'Стиль',
      count_likes: 2374,
      title: 'Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль',
      description: 'Приобретенные уроки и навыки помогают нам лучше понимать окружающий мир, а также эффективно преодолевать трудности и стремиться к новым высотам. Структура обеспечивает нам основу для организации наших усилий, позволяет нам установить ясные цели и последовательно двигаться к их достижению. Она служит нам направляющей звездой в нашем путешествии к успеху '
   },
   {
      id: 2,
      category: 'Стиль',
      count_likes: 2374,
      title: 'Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль',
      description: 'Приобретенные уроки и навыки помогают нам лучше понимать окружающий мир, а также эффективно преодолевать трудности и стремиться к новым высотам. Структура обеспечивает нам основу для организации наших усилий, позволяет нам установить ясные цели и последовательно двигаться к их достижению. Она служит нам направляющей звездой в нашем путешествии к успеху '
   },
   {
      id: 3,
      category: 'Стиль',
      count_likes: 2374,
      title: 'Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль',
      description: 'Приобретенные уроки и навыки помогают нам лучше понимать окружающий мир, а также эффективно преодолевать трудности и стремиться к новым высотам. Структура обеспечивает нам основу для организации наших усилий, позволяет нам установить ясные цели и последовательно двигаться к их достижению. Она служит нам направляющей звездой в нашем путешествии к успеху '
   },
   {
      id: 4,
      category: 'Стиль',
      count_likes: 2374,
      title: 'Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль',
      description: 'Приобретенные уроки и навыки помогают нам лучше понимать окружающий мир, а также эффективно преодолевать трудности и стремиться к новым высотам. Структура обеспечивает нам основу для организации наших усилий, позволяет нам установить ясные цели и последовательно двигаться к их достижению. Она служит нам направляющей звездой в нашем путешествии к успеху '
   },
   {
      id: 5,
      category: 'Стиль',
      count_likes: 2374,
      title: 'Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль',
      description: 'Приобретенные уроки и навыки помогают нам лучше понимать окружающий мир, а также эффективно преодолевать трудности и стремиться к новым высотам. Структура обеспечивает нам основу для организации наших усилий, позволяет нам установить ясные цели и последовательно двигаться к их достижению. Она служит нам направляющей звездой в нашем путешествии к успеху '
   }
]
*/

const CONTENT_WIDTH = 202

const SportPopular = () => {
   const [news, setNews] = useState([])
   const [offset, setOffset] = useState(0)

   const handleLeftArrowClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset + CONTENT_WIDTH;
         return newOffset > 0 ? -(CONTENT_WIDTH * (news.length - 3)) : newOffset;
      })
   }
   
   const handleRightArrowClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset - CONTENT_WIDTH;
         return newOffset < -(CONTENT_WIDTH * (news.length - 3)) ? 0 : newOffset;
      })
   }

   useEffect(() => {
      const getPopularNews = async () => {
         try {
            const response = await axios.get('http://localhost:3001/newsData/')
            let helperData = []

            response.data.forEach((category) => {
               category.news.forEach((item) => {
                  helperData.push(item)
               })
            })

            setNews(helperData.sort((a, b) => b.count_likes - a.count_likes).slice(0, 10))

         } catch (e) {
            console.error(`server error: ${e}`)
            return null
         }
      }

      getPopularNews()
   }, [])

   return (
      <section className="section3">
         <div 
            className='section3-sport'
            style={{
               background: `url('https://www.cityam.com/wp-content/uploads/2019/05/sky-sports-tv-cameraman-filming-2884809-5b9a8958950f4.jpg?w=742')`,
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat'
            }}   
         >
            <div className='section3-sport__name'>Спорт</div>
            <NavLink className='section3-sport__play'>
               <FaPlay className='section3-sport__play_icon' />
            </NavLink>
         </div>

         <div className='section3-popular'>

            <div className='section3-popular__header'>
               <div className='section3-popular__header-info'>
                  <FaHeart className='section3-popular__header-info_icon' />
                  <div className='section3-popular__header-info_title'>
                     Самые популярные новости
                  </div>
               </div>
               <div className='section3-popular__header-action-btn'>
                  <NavLink onClick={handleLeftArrowClick} className='section3-popular__header-action-btn__wrap'>
                     <FaChevronLeft className='section3-popular__header-action-btn__wrap_left' />
                  </NavLink>
                  <NavLink onClick={handleRightArrowClick} className='section3-popular__header-action-btn__wrap'>
                     <FaChevronRight className='section3-popular__header-action-btn__wrap_right' />
                  </NavLink>
               </div>
            </div>

            <div className='section3-popular__content'>
               <div className='section3-popular__content-window'>
                  <div 
                     className='section3-popular__content-window__all-news'
                     style={{transform: `translateX(${offset}px)`}}>
                     {news.map((item) => 
                        <PopularNews key={item.id} data={item} />
                     )}
                  </div>   
               </div>
            </div>
 
         </div>
      </section>
   )
}

const PopularNews = ({ data }) => {
   return (
      <div 
         className='news'
         style={{
            maxWidth: `${CONTENT_WIDTH}px`,
            minWidth: `${CONTENT_WIDTH}px`
         }}
      >

         <div className='news-main-info'>
            <div className='news-main-info__name'>{data.category.slice(0, 7)}...</div>
            <div className='news-main-info__likes'>
               <FaHeart className='news-main-info__likes-icon' />
               <div className='news-main-info__likes-count'>{data.count_likes}</div>
            </div>
         </div>
         
         <Link className='news-content-title'>{data.title}</Link>
         <div className='news-content-desc'>{data.description}</div>
      </div>
   )  
}

export default SportPopular
