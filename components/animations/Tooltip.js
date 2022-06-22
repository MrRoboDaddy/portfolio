import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Underline from "./Underline";
import styles from '../../styles/Tooltip.module.css';

export default function Tooltip({
  visible,
  tooltipItems,
  tooltipUrl
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
    },
    show: {
      y: -10,
      opacity: 1,
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
          {tooltipItems.map((item, i) => (
            <motion.li
              key={i}
              variants={childVariants}
              layout
              className={styles.tooltipLi}
            >
              <Underline
                key={i}
              >
                <Link
                  href={tooltipUrl[i]}
                >
                  <a
                    // target='_blank'
                    className={styles.child}
                  >
                    {item}
                  </a>
                </Link>
              </Underline>
            </motion.li>
          ))}
        </motion.ul>
      }
    </AnimatePresence>
  );
}
