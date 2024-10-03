import { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html>
      <Head>
        <title>Hello world</title>
        <meta
          property="og:image"
          content="https://og-examples.vercel.sh/api/static"
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