import './countUserAction.scss'

import { LiaEyeSolid } from "react-icons/lia";
import { IoMdChatbubbles } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const CountUserAction = ({ count_views, count_likes }) => {
   return (
      <div className='main-news-window__all-pages__page-info'>
         <div className='main-news-window__all-pages__page-info__watches'>
            <LiaEyeSolid className='main-news-window__all-pages__page-info__watches-img' />
            <div className='main-news-window__all-pages__page-info__watches-value'>{count_views}</div>
         </div>
         <div className='main-news-window__all-pages__page-info__messages'>
            <IoMdChatbubbles className='main-news-window__all-pages__page-info__messages-img' />
            <div className='main-news-window__all-pages__page-info__messages-value'>2344</div>
         </div>
         <div className='main-news-window__all-pages__page-info__likes'>
            <FaHeart className='main-news-window__all-pages__page-info__likes-img' />
            <div className='main-news-window__all-pages__page-info__likes-value'>{count_likes}</div>
         </div>
         <div className='main-news-window__all-pages__page-info__author'>
            <FaUser className='main-news-window__all-pages__page-info__author-img' />
            <div className='main-news-window__all-pages__page-info__author-value'>Сидоров Петр Сергеевич</div>
         </div>
      </div>
   )
}

export default CountUserAction
