import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Underline from "./Underline";
import styles from '../../styles/Tooltip.module.css';

export default function Tooltip({
  visible,
  children,
  url
}) {

  const wrapVariant = {
    hidden: {
      y: -25,
      opacity: 0,
    },
    show: {
      opacity: 1,
      y: -30,
      transition: { staggerChildren: 0.07, delayChildren: 0.03, }
    }
  };

  const childVariants = {
    hidden: {
      y: 0,
      opacity: 1,
      // transition: {
      //   y: { stiffness: 1000 }
      // }
    },
    show: {
      y: -20,
      opacity: 1,
      // transition: {
      //   y: { stiffness: 1000 }
      // }

    }
  };

  return (
    <AnimatePresence >
      {
        visible &&
        <motion.ul
          className={styles.list}
          exit={{ opacity: 0, y: -25, transition: { duration: .2 } }}
          variants={wrapVariant}
          intitial={'hidden'}
          animate={'show'}
          layout
        >
          {children.map((child, i) => (
            <motion.li
              variants={childVariants}
              layout
            >
              <Underline
                key={i}
              >
                <Link
                  href={'https://www.instagram.com/rdemoss_art/'}
                >
                  <p className={styles.child}>{child}</p>
                </Link>
              </Underline>
            </motion.li>
          ))}
        </motion.ul>
      }
    </AnimatePresence>
  );
}
