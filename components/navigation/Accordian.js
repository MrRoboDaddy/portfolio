import MobileLink from "./MobileLink";
import { motion, AnimatePresence } from "framer-motion";
import Underline from '../animations/Underline';

import styles from '../../styles/Accordian.module.css';

export default function Accordian({
  i,
  expanded,
  setExpanded,
  item,
}) {
  const isOpen = i === expanded;

  const { category } = item.fields;
  const { tooltipItems } = item.fields;
  const { tooltipUrl } = item.fields;


  return (
    <>
      <motion.div
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className={styles.catContainer}
      >
        <Underline
          color={'primary'}
          active={isOpen && true}
        >
          <h1
            className={styles.category}
          >
            {category}
          </h1>
        </Underline>
      </motion.div>
      <AnimatePresence initial={false}>
        {
          isOpen &&
          tooltipItems.map((item, i) => (
            <motion.div
              key={i}
              initial="collapsed"
              animate="expand"
              exit="collapsed"
              variants={{
                expand: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0, transition: { duration: 0.2 } }
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <MobileLink
                key={i}
                item={item}
                isOpen={isOpen}
                url={tooltipUrl[i]}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
}
