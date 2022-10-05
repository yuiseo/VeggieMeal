import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
      <Head>
      {/* 웹,카카오,네이버 */}
      <meta property="og:title" content="베지밀" />
      <meta property="og:description" content="더 건강하고 더 경제적인 당신의 식사를 위해" />
      <meta property="og:url" content="https://j7c205.p.ssafy.io/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/Logo_icon.png" />

      {/* 트위터 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="베지밀" />
      <meta name="twitter:description" content="더 건강하고 더 경제적인 당신의 식사를 위해" />
      <meta name="twitter:image" content="/Logo_icon.png" />
      <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css" rel="stylesheet" crossOrigin='anonymous'  />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}