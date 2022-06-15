import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>RoboDaddy</title>
        <meta name="description" content="RoboDaaddy's Art Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          className={styles.imgContainer}
        >
          <div
            className={styles.mainImage}
          // width={1920}
          // height={1350}
          />
        </div>
      </main>
    </div>
  );
}
