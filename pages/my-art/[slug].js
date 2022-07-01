import Layout from "../../components/layout/Layout";
import GallCard from "../../components/cards/GallCard";
import MotionGall from "../../components/animations/MotionGall";
import { useState } from "react";
import { createClient } from "contentful";
import { motion } from "framer-motion";

import styles from '../../styles/Gallery.module.css';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const art = await client.getEntries({ order: 'fields.date', content_type: 'artCategory' });

  const paths = art.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export async function getStaticProps({ params }) {

  const nav = await client.getEntries({ order: 'fields.date', content_type: 'navItem' });
  const { items } = await client.getEntries({ content_type: 'artCategory', 'fields.slug': params.slug });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      navItems: nav.items,
      artItems: items,
    }
  };
};

export default function Gallery({ navItems, artItems }) {

  const [gallI, setGallI] = useState(0);
  const [visible, setVisible] = useState(false);

  const { gallery } = artItems[0].fields;
  const { category } = artItems[0].fields;

  const toggleGall = () => {
    setVisible(!visible);
  };

  const setGall = (i) => {
    setGallI(i);
  };

  return (
    <Layout
      navItems={navItems}
    >
      <MotionGall
        gallery={gallery}
        hideGall={toggleGall}
        visible={visible}
        gallI={gallI}
      />
      <div
        className={styles.wrapper}
        style={{ overflowY: visible ? 'hidden' : 'scroll' }}
      >
        <h1
          className={styles.category}
        >
          {category}
        </h1>
        <motion.div
          className={styles.container}
        >
          {
            gallery.map((item, i) =>
              <GallCard
                i={i}
                key={item.sys.id}
                art={item}
                showGall={toggleGall}
                setGall={setGall}
              />
            )
          }
        </motion.div>
      </div>
    </Layout>
  );
}