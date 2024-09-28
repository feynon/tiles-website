'use client';

import { useState } from 'react';

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(false);

  const handleToggle = () => {
    setIsPaused((prevState) => !prevState);
    console.log(isPaused ? 'Resumed' : 'Paused');
  };

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
        <button
          className={`toggle-button ${isPaused ? 'play' : 'pause'}`}
          aria-label={isPaused ? "Play button" : "Pause button"}
          onClick={handleToggle}
        ></button>
      </main>
      <footer>
        <p>
          AI inference engine built with Rust, WebAssembly, and WebGPU, demoed
          using{' '}
          <a
            href="https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Llama 3.2 3B
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
