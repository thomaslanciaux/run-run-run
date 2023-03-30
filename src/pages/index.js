import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const Game = dynamic(() => import('@/components/game'), {
  ssr: false
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const CryptoRunner = () => {
  return (
    <>
      <Head>
        <title>Run run run</title>
        <meta name="description" content="Run run run" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${poppins.className} h-full`}>
        <Game />
      </main>
    </>
  )
};

export default CryptoRunner;
