'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const pauseButton = document.querySelector('.pause-button');
    if (pauseButton) {
      pauseButton.addEventListener('click', () => {
        // Add your JavaScript functionality here
        console.log('Pause button clicked');
      });
    }
    // Cleanup event listener on component unmount
    return () => {
      if (pauseButton) {
        pauseButton.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <>
      <header className="header">
        <svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 100"
          aria-label="Tiles Logo"
        >
          <rect width="300" height="100" fill="#ffffff" />
          <g transform="translate(10, 25)">
            <rect
              className="tile"
              x="0"
              y="0"
              width="20"
              height="20"
              fill="#ff0000"
            />
            <rect
              className="tile"
              x="25"
              y="0"
              width="20"
              height="20"
              fill="#ff3333"
            />
            <rect
              className="tile"
              x="50"
              y="0"
              width="20"
              height="20"
              fill="#ff6666"
            />
            <rect
              className="tile"
              x="75"
              y="0"
              width="20"
              height="20"
              fill="#ff9999"
            />
            <rect
              className="tile"
              x="100"
              y="0"
              width="20"
              height="20"
              fill="#ffcccc"
            />
          </g>
        </svg>
      </header>
      <main className="content">
        <div className="speed-display" aria-label="Token processing speed">
          30
        </div>
        <div className="unit">tokens/second</div>
        <div
          className="pause-button"
          aria-label="Pause button"
          role="button"
          tabIndex="0"
        ></div>
      </main>
      <footer>
        <p>
          AI inference engine built with Rust, WebAssembly, and WebGPU, demoed
          using{' '}
          <a
            href="https://azure.microsoft.com/en-us/blog/introducing-phi-3-redefining-whats-possible-with-slms/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Phi 3
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/huggingface/ratchet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ratchet
          </a>
          .
        </p>
        <p>
          Work in progress, designed by{' '}
          <a
            href="https://ankeshbharti.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @feynon
          </a>
          .{' '}
          <a
            href="https://ankeshbharti.com/stories/the-new-intelligence"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More.
          </a>
        </p>
      </footer>
    </>
  );
}
