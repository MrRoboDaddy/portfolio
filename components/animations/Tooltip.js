import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "./NavItem";
import styles from '../../styles/Tooltip.module.css';

export default function Tooltip({ children, url }) {



  return (
    <motion.div
      className={styles.wrapper}>
      <motion.ul className={styles.list}>
        {children.map((child, i) => {
          <motion.li
            key={i}
          >
            <Link
              href={'/'}
            >
              <NavItem>
                {child}
              </NavItem>
            </Link>
          </motion.li>;
        })
        }
      </motion.ul>
    </motion.div>
  );
}
