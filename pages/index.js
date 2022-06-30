import { createClient } from 'contentful';
import Image from 'next/image';
import Layout from '../components/layout/Layout';

import styles from '../styles/Home.module.css';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const nav = await client.getEntries({ order: 'fields.date', content_type: 'navItem' });
  const art = await client.getEntries({ content_type: 'homeImage' });

  return {
    props: {
      navItems: nav.items,
      homeImage: art.items
    }
  };
}

export default function Home({ navItems, homeImage }) {
  const { url } = homeImage[0].fields.image.fields.file;
  const { title } = homeImage[0].fields.image.fields;

  return (
    <Layout
      navItems={navItems}
      color={'primary'}
    >
      <div className={styles.imgContainer}>
        <Image
          priority
          src={`https:${url}`}
          alt={title}
          layout='fill'
          className={styles.mainImage}
        />
      </div>
    </Layout>
  );
}
