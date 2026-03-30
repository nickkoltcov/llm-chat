import Image from 'next/image';
import styles from './button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon';
  size?: 'sm' | 'md' | 'lg';    
  icon?: string;                
  children?: React.ReactNode;   
}

export default function Button({variant = 'primary', size = 'md', icon, children, className, ...props}: ButtonProps) {
  return (
    <button 
      className={clsx(
        styles.button, 
        styles[`button--${variant}`], 
        styles[`button--${size}`],    
        className
      )} 
      {...props}
    >
      {icon && (
        <span className={styles['button__icon-wrapper']}>
          <Image src={icon} width={15} height={15} alt="" />
        </span>
      )}
      {children}
    </button>
  );
}
