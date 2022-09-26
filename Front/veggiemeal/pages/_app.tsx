import '../styles/globals.scss'
import '../styles/bootstrap.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Script from "next/script";
import Navbar from 'components/Navbar';

declare global {
  interface Window {
    kakao: any;
    naver: any;
  }}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <header>
            <Navbar />
        </header>
        <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services&autoload=false`}
            strategy="beforeInteractive"
          />
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp
