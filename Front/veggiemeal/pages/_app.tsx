import '../styles/globals.scss'
import '../styles/bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Navbar from 'components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <header>
            <Navbar />
        </header>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp
