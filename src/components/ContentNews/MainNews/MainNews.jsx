import { useState, useEffect } from 'react'
import axios from 'axios';

import './mainNews.scss'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import CountUserAction from '../CountUserAction/CountUserAction';


const PAGE_WIDTH = 1200

const MainNews = () => {
   const [page, setPage] = useState([])
   const [offset, setOffset] = useState(0)

   useEffect(() => {
      const getMainData = async () => {
         try {
            const response = await axios.get('http://localhost:3001/newsData/')
            setPage(response.data)
         } catch (e) {
            console.error(`server error: ${e}`)
            return null
         }
      }

      getMainData()
   }, [])

   
   const handleLeftArrowClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset + PAGE_WIDTH;
         return newOffset > 0 ? -(PAGE_WIDTH * (page.length - 1)) : newOffset;
      })
   }
   
   const handleRightArrowClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset - PAGE_WIDTH;
         return newOffset < -(PAGE_WIDTH * (page.length - 1)) ? 0 : newOffset;
      })
   }

   return (
      <div className='main-news'>
         <div className='main-news-window'>
            <div 
               className='main-news-window__all-pages'
               style={{
                  transform: `translateX(${offset}px)`
               }}
            >
               {page.map((item) => 
                  <PageInSlide 
                     key={item.id} 
                     data={item}
                     onClickLeft={handleLeftArrowClick}
                     onClickRight={handleRightArrowClick}
                  />
               )}
            </div>
         </div>
      </div>
   )
}

const PageInSlide = ({ data, onClickLeft, onClickRight }) => {
   let count_views = 0,
      count_likes = 0,
      count_msg = 0

   data.news.forEach((item, index) => {
      count_views += item.count_views
      count_likes += item.count_likes
   })

   return (
      <div
         className='main-news-window__all-pages__page'
         style={{
            maxWidth: `${PAGE_WIDTH}px`,
            minWidth: `${PAGE_WIDTH}px`,
            background: `url('${data.img}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
         }}
      >
         <div className='main-news-window__all-pages__page-name'>{data.name_ru}</div>

         <div className='main-news-window__all-pages__page-center'>
            <div className='main-news-window__all-pages__page-center-left'>
               <FaChevronLeft 
                  onClick={onClickLeft}
                  className='main-news-window__all-pages__page-center-left__img' 
               />
            </div>
            <div className='main-news-window__all-pages__page-center-desc'>
               <div className='main-news-window__all-pages__page-center-desc__title'>{data.title}</div>
               <div className='main-news-window__all-pages__page-center-desc__subtitle'>{data.subtitle}</div>
            </div>
            <div className='main-news-window__all-pages__page-center-right'>
               <FaChevronRight 
                  onClick={onClickRight}
                  className='main-news-window__all-pages__page-center-right__img' 
               />
            </div>
         </div>
         <CountUserAction 
            count_likes={count_likes}
            count_views={count_views}
         />
      </div>
   )
}

export default MainNews