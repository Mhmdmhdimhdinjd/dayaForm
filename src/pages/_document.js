import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='fa'>
      <Head >
      <link rel="icon" href="@/src/public/favicon.ico" />
      </Head>
      <body className="no-fouc">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}