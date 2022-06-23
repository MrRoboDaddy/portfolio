import Layout from "../../components/layout/Layout";
import GallCard from "../../components/cards/GallCard";
import { createClient } from "contentful";
import Image from "next/image";

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

  const { gallery } = artItems[0].fields;

  return (
    <Layout
      navItems={navItems}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {
            gallery.map(image =>
              <GallCard
                key={image.sys.id}
                art={image}
              />
            )
          }
        </div>
      </div>
    </Layout>
  );
}
