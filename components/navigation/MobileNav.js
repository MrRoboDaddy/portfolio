import { AnimatePresence, motion, useCycle } from "framer-motion";
import Accordian from "./Accordian";
import { useState } from "react";
import Link from "next/link";

import styles from '../../styles/MobileNav.module.css';

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: {
    opacity: 1,
  }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      delayChildren: .2,
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#cccccc"
    strokeLinecap="round"
    {...props}
  />
);

export default function MobileNav({ navItems }) {

  const [open, cycleOpen] = useCycle(false, true);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.button
        className={styles.btnContainer}
        initial={false}
        animate={open ? 'open' : 'closed'}
        onClick={cycleOpen}

      >
        <svg width="50" height="50" viewBox="-8 -8 37 37">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.aside
            className={styles.aside}
            initial={{ width: 0 }}
            animate={{
              width: '100vw',
              transition: { duration: 0.4 }
            }}
            exit={{
              width: 0,
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            <motion.div
              className={styles.container}
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={styles.itemContainer}
                >
                  <Accordian
                    i={i}
                    item={item}
                    expanded={expanded}
                    setExpanded={setExpanded}
                  />
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                className={styles.socialContainer}>
                <Link href='https://www.instagram.com/rdemoss_art/'>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={styles.social}
                  >
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </motion.svg>
                </Link>
                <Link href='https://www.reddit.com/user/MrRoboDaddy'>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={styles.social}

                  >
                    <path d="M283.2 345.5c2.7 2.7 2.7 6.8 0 9.2-24.5 24.5-93.8 24.6-118.4 0-2.7-2.4-2.7-6.5 0-9.2 2.4-2.4 6.5-2.4 8.9 0 18.7 19.2 81 19.6 100.5 0 2.4-2.3 6.6-2.3 9 0zm-91.3-53.8c0-14.9-11.9-26.8-26.5-26.8-14.9 0-26.8 11.9-26.8 26.8 0 14.6 11.9 26.5 26.8 26.5 14.6 0 26.5-11.9 26.5-26.5zm90.7-26.8c-14.6 0-26.5 11.9-26.5 26.8 0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-11.9 26.8-26.5 0-14.9-11.9-26.8-26.8-26.8zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-99.7 140.6c-10.1 0-19 4.2-25.6 10.7-24.1-16.7-56.5-27.4-92.5-28.6l18.7-84.2 59.5 13.4c0 14.6 11.9 26.5 26.5 26.5 14.9 0 26.8-12.2 26.8-26.8 0-14.6-11.9-26.8-26.8-26.8-10.4 0-19.3 6.2-23.8 14.9l-65.7-14.6c-3.3-.9-6.5 1.5-7.4 4.8l-20.5 92.8c-35.7 1.5-67.8 12.2-91.9 28.9-6.5-6.8-15.8-11-25.9-11-37.5 0-49.8 50.4-15.5 67.5-1.2 5.4-1.8 11-1.8 16.7 0 56.5 63.7 102.3 141.9 102.3 78.5 0 142.2-45.8 142.2-102.3 0-5.7-.6-11.6-2.1-17 33.6-17.2 21.2-67.2-16.1-67.2z" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
