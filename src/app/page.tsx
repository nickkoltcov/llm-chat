import styles from '@/app/home-page.module.scss'
import clsx from 'clsx'
import FormMainPage from '@/components/formMainPage/formMainPage'


export default function StartPage() {

  return (
    <section className={styles.home}>
      <div className={styles.home__card}>
        <h1 className={clsx(styles.home__title, 'd-4')}>Welcome back, Mauro</h1>
        <p className={clsx(styles.home__subtitle, 'd-5')}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed
        </p>
        <FormMainPage/>
      </div>
    </section>
  )
}
