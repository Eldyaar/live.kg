import { NewsLetter } from '../NewsLetter/NewsLetter'
import CenterSectionNews from './CenterSection/CenterSectionNews'
import MainNews from './MainNews/MainNews'
import SportPopular from './SportAndPopular/SportPopular'

import './contentNews.scss'


const ContentNews = () => {

   return (
      <section className="content-news">
         <div className='content-news-container'>
            <MainNews />
            <CenterSectionNews />
            <SportPopular />
            <NewsLetter />
         </div>
      </section>
   )
}

export default ContentNews

// 'http://10.2.10.77:8080/'
// Design: https://www.behance.net/gallery/137524175/novostnoj-sajt/modules/777671381