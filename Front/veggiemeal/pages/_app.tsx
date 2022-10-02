import '../styles/globals.scss'
import '../styles/bootstrap.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Script from "next/script";
import Navbar from 'components/Navbar';
import * as Sentry from "@sentry/nextjs";
import { Integrations } from "@sentry/tracing";
import { useEffect } from 'react';
import initialize from './api/kakaoInitial';

declare global {
  interface Window {
    kakao:any;
    Kakao:any;
    naver: any;
  }}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // useEffect(()=>{
  //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY);
  // }, [])
  
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
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp
