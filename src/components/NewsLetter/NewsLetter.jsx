import { useForm } from 'react-hook-form'

import './newsLetter.scss'

export const NewsLetter = () => {
   const {register, handleSubmit, reset} = useForm({})

   const onSubmit = (data) => {
      console.log(data)

      reset()
   }

   return (
      <section className="news-letter">
         <div className="container">
            <div className="news-letter-inner">
               <div className='news-letter-inner__title'>Рассылка</div>
               <div className='news-letter-inner__subtitle'>
                  Будь в курсе событий! Подпишись на нашу рассылку и получай первым самые свежие новости прямо в свой почтовый ящик. Узнавай о важных событиях, эксклюзивных материалах и акциях. Будь в центре событий вместе с нами!
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className='news-letter-inner__form'>
                  <input {...register('email')} className='news-letter-inner__form_input' placeholder='Email...' />
                  <button type='submit' className='news-letter-inner__form_btn'>Отправить</button>
               </form>
            </div>
         </div>
      </section>
   )
}
