import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GameProvider } from '@/hooks/game-context';

const Game = dynamic(() => import('@/components/game'), {
  ssr: false
});

const CryptoRunner = () => {
  return (
    <>
      <Head>
        <title>👟 Crypto Runner</title>
        <meta name="description" content="Run run run" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`h-full`}>
        <GameProvider>
          <Game />
        </GameProvider>
      </main>
    </>
  )
};

export default CryptoRunner;
