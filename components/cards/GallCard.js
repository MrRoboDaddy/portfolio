import Image from "next/image";
import { motion } from "framer-motion";

import styles from '../../styles/GallCard.module.css';

export default function GallCard({ art }) {

  const { title } = art.fields;
  const { url } = art.fields.file;
  return (
    <motion.div
      whileHover={{ y: -10, transition: .3 }}
      className={styles.container}>
      <Image
        src={`https:${url}`}
        alt={title}
        layout='fill'
        className={styles.image}
      />
    </motion.div>
  );
}
