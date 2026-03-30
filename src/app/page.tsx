import styles from '@/app/home-page.module.scss'
import Button from '@/shared/ui/button/button'

export default function StartPage() {
  return (
    <section className={styles.home}>
      <div className={styles.home__card}>
        <h1 className={styles.home__title}>Welcome back, Mauro</h1>
        <p className={styles.home__subtitle}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed
        </p>
        
        <form className={styles.home__form}>
          <input 
            className={styles.home__input} 
            placeholder="How can I help you?"
          />
          <Button variant="icon" icon="/paper-plane.svg" size="lg" />
        </form>
      </div>
    </section>
  )
}
