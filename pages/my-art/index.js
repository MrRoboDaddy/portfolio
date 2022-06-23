import Layout from "../../components/layout/Layout";
import CatCard from "../../components/cards/CatCard";
import { createClient } from 'contentful';

import styles from '../../styles/my-art.module.css';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const nav = await client.getEntries({ order: 'fields.date', content_type: 'navItem' });
  const art = await client.getEntries({ order: 'fields.date', content_type: 'artCategory' });

  return {
    props: {
      navItems: nav.items,
      artItems: art.items
    }
  };
}

export default function MyArt({ navItems, artItems }) {

  return (
    <Layout
      navItems={navItems}
    >
      <div className={styles.container}>
        {
          artItems.map(item =>
            <CatCard
              key={item.sys.id}
              item={item}
            />
          )
        }
      </div>

    </Layout>
  );
}
