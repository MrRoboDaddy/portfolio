import Head from 'next/head';

export default function Metatags({
  title = 'MrRoboDaddy',
  description = "RoboDaaddy's Art Portfolio",
  image = '../../public/paintbrush.svg',
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href='/paintbrush.svg' />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}