import Head from 'next/head';
import { Header } from '../components/oraganisms/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>헤네인</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1 className="text-3xl">게시판</h1>
    </>
  );
}
