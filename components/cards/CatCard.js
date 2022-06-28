import Image from "next/image";
import Link from "next/link";
import Underline from "../animations/Underline";
import { motion } from "framer-motion";
import styles from '../../styles/CatCard.module.css';

export default function CatCard({ item }) {
  const { category, slug, thumbnail } = item.fields;
  return (
    <motion.div
      whileHover={{ y: -8, transition: .3 }}
      className={styles.container}
    >

      <Link href={`/my-art/${slug}`}>
        <div>
          <div className={styles.overlay}></div>
          <h1
            className={styles.category}
          >
            <Underline
              color={'primary'}
            >
              {category}
            </Underline>
          </h1>
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            priority
            width={450}
            height={450}
            blurDataURL
            placeholder='color'
            className={styles.image}
          />
        </div>
      </Link>
    </motion.div>
  );
}
