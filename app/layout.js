import './globals.css';

export const metadata = {
  title: 'Tiles: AI inference engine built with Rust, WebAssembly & WebGPU',
  description:
    'Tiles is an AI inference engine built with Rust, WebAssembly, and WebGPU. A project by @feynon.',
  keywords: ['AI', 'inference engine', 'Rust', 'WebAssembly', 'WebGPU'],
  authors: [{ name: '@feynon' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.tiles.run" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
