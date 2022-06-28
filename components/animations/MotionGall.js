import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";

import styles from '../../styles/MotionGall.module.css';

const parentVarient = {
  enter: {
    opacity: 0
  },
  center: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    transition: {
      duration: .3
    }
  }
};

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function MotionGall({
  gallery,
  hideGall,
  gallI,
  visible,
}) {

  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    setPage([gallI]);
  }, [gallI]);

  const imageIndex = wrap(0, gallery.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };


  return (
    <LayoutGroup type='switch'>
      <AnimatePresence initial={false} custom={direction}>
        {
          visible &&
          <motion.div
            layoutId='motion-gall-container'
            className={styles.container}
            variants={parentVarient}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              key={page}
              className={styles.imageContainer}
              layoutId={gallery[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: .3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              dragPropagation
            >
              <Image
                priority
                src={`https:${gallery[imageIndex].fields.file.url}`}
                layout='fill'
                className={styles.image}
              />
            </motion.div>
            <div
              className={styles.exit}
              onClick={() => hideGall()}
            >
              {"x"}
            </div>
            <div className={styles.next} onClick={() => paginate(1)}>
              {"‣"}
            </div>
            <div className={styles.prev} onClick={() => paginate(-1)}>
              {"‣"}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </LayoutGroup>
  );
};