import { motion } from "framer-motion";

import styles from '../../styles/NavItem.module.css';

export default function NavItem({ children }) {

  const parVariant = {
    hidden: {},
    hover: {}
  };

  const hovVariant = {
    hidden: {
      opacity: 0,
      y: 7,
      scale: 0.5,
    },
    hover: {
      opacity: 1,
      y: 5,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
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
        className={styles.underline}
        variants={hovVariant}></motion.div>
    </motion.div>
  );
}
