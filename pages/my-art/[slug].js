import Layout from "../../components/layout/Layout";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {

  const res = await client.getEntries({ order: 'fields.date', content_type: 'navItem' });

  return {
    props: { navItems: res.items }
  };
};

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

export default function Gallery({ navItems }) {
  return (
    <Layout
      navItems={navItems}
    >
      <h1>HI MOM</h1>
    </Layout>
  );
}
