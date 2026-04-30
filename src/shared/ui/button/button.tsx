import styles from './button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'send';    
  Icon?: React.ElementType;
  iconSize?: number;                
  children?: React.ReactNode;   
}

export default function Button({variant = 'primary', size = 'md', Icon, iconSize = 15, children, className, ...props}: ButtonProps) {
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
      {Icon && (
        <span className={styles['button__icon-wrapper']}>
          <Icon width={iconSize} height={iconSize}/>
        </span>
      )}
      {children}
    </button>
  );
}
