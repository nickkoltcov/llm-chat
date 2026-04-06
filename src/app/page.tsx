import styles from '@/app/home-page.module.scss'
import Button from '@/shared/ui/button/button'
import clsx from 'clsx'
import PaperPlane from '@/shared/assets/icons/paper-plane.svg'

export default function StartPage() {
  return (
    <section className={styles.home}>
      <div className={styles.home__card}>
        <h1 className={clsx(styles.home__title, 'd-4')}>Welcome back, Mauro</h1>
        <p className={clsx(styles.home__subtitle, 'd-5')}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed
        </p>
        
        <form className={styles.home__form}>
          <input 
            className={clsx(styles.home__input, 'd-5')} 
            placeholder="How can I help you?"
          />
          <Button 
            variant="icon" 
            Icon={PaperPlane} 
            size="lg" 
            iconSize={18} 
            className={styles.home__send_btn}
          />
        </form>
      </div>
    </section>
  )
}
