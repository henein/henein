import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
