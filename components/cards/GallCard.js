import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import styles from '../../styles/GallCard.module.css';

export default function GallCard({ art, showGall, i, setGall }) {

  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const { title } = art.fields;
  const { url } = art.fields.file;

  return (
    <motion.div
      whileHover={{ y: -8, transition: .3 }}
      className={styles.container}
      layout
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: imageIsLoaded ? 1 : 0,
        transition: { delay: imageIsLoaded && (Math.random() * .5) + .3, duration: imageIsLoaded && .7 }
      }}
      onClick={() => {
        setGall(i);
        showGall();
      }}
    >
      <Image
        src={`https:${url}`}
        alt={title}
        layout='fill'
        className={styles.image}
        onLoad={event => {
          const target = event.target;
          // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
          if (target.src.indexOf('data:image/gif;base64') < 0) {
            setImageIsLoaded(true);
          }
        }}
      />
    </motion.div>
  );
}
