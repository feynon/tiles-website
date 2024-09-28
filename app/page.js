'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTiles, setActiveTiles] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    let interval;
    if (!isPaused && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 1, 100);
          setActiveTiles(Math.floor(newProgress / (100 / totalTiles)));
          // Only set displayNumber to 30 when progress reaches 100%
          if (newProgress === 100) {
            setDisplayNumber(30);
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPaused, progress]);

  const handleToggle = () => {
    setIsPaused((prevState) => !prevState);
    if (isPaused) {
      // Reset progress and display number when starting
      setProgress(0);
      setDisplayNumber(0);
    }
    console.log(isPaused ? 'Resumed' : 'Paused');
  };

  const totalTiles = 10; // Changed from 15 to 10
  const tileSize = 28; // Define a constant for tile size
  const gap = 2; // Define a small gap between tiles

  const generateTiles = () => {
    const tiles = [];

    for (let i = 0; i < totalTiles; i++) {
      const isActive = i < activeTiles;
      const opacity = isActive ? 1 : 0.2;
      const hue = 0; // Red hue
      const lightness = 50 + (50 - (i / (totalTiles - 1)) * 50); // Range from 100% to 50%
      tiles.push(
        <rect
          key={i}
          className="tile"
          x={i * (tileSize + gap)}
          y="0"
          width={tileSize}
          height={tileSize}
          fill={`hsla(${hue}, 100%, ${lightness}%, ${opacity})`}
        />
      );
    }
    return tiles;
  };

  const svgWidth = totalTiles * (tileSize + gap) - gap; // Calculate total width

  return (
    <>
      <header className="header">
        <svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} ${tileSize}`}
          aria-label="Download Progress"
        >
          <g>{generateTiles()}</g>
        </svg>
      </header>
      <main className="content">
        <div className="speed-display" aria-label="Token processing speed">
          {displayNumber}
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
