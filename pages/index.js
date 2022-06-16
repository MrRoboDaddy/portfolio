import Head from 'next/head';
import { useState, useEffect } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {

  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const handleMouseMove = event => {
      if (event.pageY <= 75) {
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
        <title>RoboDaddy</title>
        <meta name="description" content="RoboDaaddy's Art Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          zIndex: 1,
          background: overlay ? 'rgba(0,0,0,.50)' : 'transparent',
          transition: 'background .3s ease'
        }} />
        <div className={styles.imgContainer}>
          <div className={styles.mainImage} />
        </div>
      </main>
    </div>
  );
}
