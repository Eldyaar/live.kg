import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import CountUserAction from '../CountUserAction/CountUserAction'

import './centerNews.scss'
import { FaUser } from "react-icons/fa";
import { HiMiniNewspaper } from "react-icons/hi2";
import Nav from '../../Nav/Nav';

/*
const latestNewsData = [
   {
      id: 1, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   },
   {
      id: 2, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   },
   {
      id: 3, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   },
   {
      id: 4, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   },
   {
      id: 5, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   },
   {
      id: 6, 
      img: 'https://manavrachna.edu.in/wp-content/uploads/2018/07/economics.jpg',
      title: 'Не следует однако забывать, что дальнейшее развитие различных форм',
      description: 'Экономика — это социальная наука, имеющая значение во многих других областях, включая политологию, географию, математику, социологию, психологию, инженерное дело, право, медицину и бизнес. Центральная задача экономики — определить наиболее логичное и эффективное использование ресурсов для достижения частных и социальных целей.',
      author: 'Иван Мацкеев',
      created_at: '2024-01-30T23:41:43.469159+06:00'
   }
]
*/

const CenterSectionNews = () => {
   const [latestNewsData, setLatestNewsData] = useState([])
   const [countUserActionData, setCountUserActionData] = useState({})

   const latestNews = []
   let count_views = 0, count_likes = 0


   useEffect(() => {
      const getLatestMews = async () => {
         try {
            const response = await axios.get('http://localhost:3001/newsData/')

            // filter latest news
            response.data.forEach((category, index) => {
               latestNews.push(category.news[0])

               if (category.name_ru.toLowerCase() === 'здоровье') {
                  category.forEach((item) => {
                     count_views += item.count_views
                     count_likes += item.count_likes
                  })
               }

               let date = '',
                  time = ''

               let helper = category.news[0].created_at
               category.news[0].created_at = ''
               
               for (let i = 0; i < helper.length; i++) {
                  if (i >= 0 && i <= 9) {
                     date += helper[i]
                  } else if (i >= 11 && i <= 15) {
                     time += helper[i]
                  }
               }
         
               category.news[0].created_at = `${date} | ${time}`
            })

            setLatestNewsData(latestNews)
         } catch (e) {
            console.error(`server error: ${e}`)
            return null
         }
      }

      getLatestMews()
   }, [])

   return (
      <section className='center-news'>
         <div className='center-news-wrap'>
            <div className='center-news-wrap__news-health'
               style={{
                  background: `url('https://preply.com/wp-content/uploads/2023/05/imgonline-com-ua-CompressBySize-BQodyx54UeMS-820x470.jpg')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
               }}
            >
               <div className='center-news-wrap__news-health-desc'>
                  <div className='center-news-wrap__news-health-desc__name'>Здоровье</div>
                  <NavLink className='center-news-wrap__news-health-desc__title'>
                     Здоровье — согласно Уставу ВОЗ, это состояние полного физического , психического и социального благополучия , а не только отсутствие болезней или физических дефектов
                  </NavLink>
                  <div className='center-news-wrap__news-health-desc__subtitle'>
                     Здоровье является состоянием полного физического, душевного и социального благополучия, а не только отсутствием болезней и физических дефектов.
                  </div>
               </div>
               <CountUserAction count_views={count_views} count_likes={count_likes} />
            </div>
            <div className='center-news-wrap__news-rest'
               style={{
                  background: `url('https://koruna.ua/wp-content/uploads/2021/07/Pohod-v-gory-1024x683.jpg')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
               }}
            >
               <div className='center-news-wrap__news-rest__name'>Отдых</div>
               <NavLink className='center-news-wrap__news-rest__desc'>
                  Не следует однако забывать, что дальнейшее развитие различных форм
               </NavLink>
               <div className='center-news-wrap__news-rest__author'>
                  <FaUser className='center-news-wrap__news-rest__author-logo' />
                  <div className='center-news-wrap__news-rest__author-fio'>
                     Сидоров Петр Сергеевич
                  </div>
               </div>
            </div>
            <div className='center-news-wrap__news-rest2'>
               <div 
                  className='center-news-wrap__news-rest2__top'
                  style={{
                     background: `url('https://go-ural.com/sites/default/files/styles/large/public/2020-10/%D0%B2%D0%B5%D0%BB%D0%BE1.jpeg?itok=20r9w2XO')`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                     borderRadius: '5px 5px 0px 0px'
                  }}
               >
                  <div className='center-news-wrap__news-rest2__top_name'>Отдых</div>
               </div>
               <div className='center-news-wrap__news-rest2__info'>
                  <NavLink className='center-news-wrap__news-rest2__info_desc'>
                     Не следует однако забывать, что дальнейшее развитие различных форм
                  </NavLink>
                  <div className='center-news-wrap__news-rest2__info_author'>
                     <FaUser className='center-news-wrap__news-rest2__info_author-logo' />
                     <div className='center-news-wrap__news-rest2__info_author-fio'>Сидоров Петр Сергеевич</div>
                  </div>
               </div>
            </div>
            <div className='center-news-wrap__news-latest'>

               <div className='center-news-wrap__news-latest__header'>
                  <div className='center-news-wrap__news-latest__header-info'>
                     <HiMiniNewspaper className='center-news-wrap__news-latest__header-info-logo' />
                     <NavLink className='center-news-wrap__news-latest__header-info-title'>Последние новости</NavLink>
                  </div>
                  <NavLink className='center-news-wrap__news-latest__header-show-more'>Все</NavLink>
               </div>

               <div className='center-news-wrap__news-latest__content'>
                  <div className='center-news-wrap__news-latest__content-news'>
                     {latestNewsData.map((news) => 
                        <LatestNew key={news.id} data={news} />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

const LatestNew = ({ data }) => {
   return (
      <NavLink to={`${data.id}`} className='center-news-wrap__news-latest__content-news-block'>
         <div 
            className='center-news-wrap__news-latest__content-news-block__img'
            style={{
               background: `url('${data.photo}')`,
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
            }}
         ></div>
         <div className='center-news-wrap__news-latest__content-news-block__info'>
            <div className='center-news-wrap__news-latest__content-news-block__info_title'>{data.title.slice(0, 60)}...</div>
            <div className='center-news-wrap__news-latest__content-news-block__info_date'>{data.created_at}</div>
         </div>
      </NavLink>
   )
}

export default CenterSectionNews



