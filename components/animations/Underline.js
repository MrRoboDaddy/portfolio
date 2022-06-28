import { motion } from "framer-motion";

import styles from '../../styles/Underline.module.css';

export default function Underline({
  children,
  color = 'text' }) {

  const parVariant = {
    hidden: {},
    hover: {}
  };

  const hovVariant = {
    hidden: {
      opacity: 0,
      y: 5,
      scale: 0.5,
    },
    hover: {
      opacity: 1,
      y: 3,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className={styles.container}
      varaints={parVariant}
      initial={'hidden'}
      whileHover={'hover'}
    >
      {children}
      <motion.div
        style={{
          width: '100%',
          height: ' 1px',
          backgroundColor: `var(--${color})`,
        }}
        variants={hovVariant}></motion.div>
    </motion.div>
  );
}
