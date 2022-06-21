import Head from 'next/head';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import NavBar from '../components/NavBar';

import styles from '../styles/Home.module.css';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ order: 'sys.createdAt', content_type: 'navItem' });

  return {
    props: { navItems: res.items }
  };
}

export default function Home({ navItems }) {

  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    const handleMouseMove = event => {
      if (event.pageY <= 95 && event.pageY > 2) {
        setOverlay(true);
      } else {
        setOverlay(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>MrRoboDaddy</title>
        <meta name="description" content="RoboDaaddy's Art Portfolio" />
        <link rel="icon" href="/paintbrush.svg" />
      </Head>

      <main className={styles.main}>
        <NavBar navItems={navItems} />
        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          zIndex: 1,
          background: overlay ? 'rgba(0,0,0,.40)' : 'transparent',
          transition: 'background .3s ease'
        }} />
        <div className={styles.imgContainer}>
          <div className={styles.mainImage} />
        </div>
      </main>
    </div>
  );
}
