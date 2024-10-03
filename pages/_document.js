import { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html>
      <Head>
        <title>Hello world</title>
        <meta
          property="og:image"
          content="https://www.tiles.run/api/og"
        />
        {/* ... other head elements ... */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;