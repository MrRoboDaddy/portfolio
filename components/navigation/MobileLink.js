import { motion } from "framer-motion";
import Link from "next/link";

import styles from '../../styles/MobileLink.module.css';

export default function MobileLink({ item, url, isOpen }) {
  return (
    <motion.div
      variants={{ collapsed: { scale: 0.7 }, expand: { scale: 1 } }}
      className={styles.container}
    >
      <Link
        href={url}
      >
        <a
          className={styles.link}
        >{item}</a>
      </Link>
    </motion.div>
  );
}
