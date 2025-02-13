import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ children, onClick, variant = 'primary', className }) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-600 hover:bg-red-700'
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger'])
};