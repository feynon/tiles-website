'use client';

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTiles, setActiveTiles] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false); // New state to track completion
  const [streamingText, setStreamingText] = useState('');
  const [shouldStartStreaming, setShouldStartStreaming] = useState(false);
  const streamingIndexRef = useRef(0);

  const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
  const tokensPerWord = 1.3;
  const tokensPerSecond = 15; // This is now our base rate
  const wordsPerSecond = tokensPerSecond / tokensPerWord;
  const averageWordLength = 5; // Assuming an average word length of 5 characters
  const charactersPerSecond = wordsPerSecond * averageWordLength;
  const animationInterval = 1000 / charactersPerSecond; // milliseconds per character

  useEffect(() => {
    let interval;
    if (!isPaused && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 1, 100);
          setActiveTiles(Math.floor(newProgress / (100 / totalTiles)));
          
          if (newProgress === 100) {
            setDisplayNumber(tokensPerSecond);
            setHasCompleted(true);
            setShouldStartStreaming(true);
          }
          
          return newProgress;
        });
      }, 200); // 20-second duration
    }
    return () => clearInterval(interval);
  }, [isPaused, progress]);

  useEffect(() => {
    let intervalId;

    if (shouldStartStreaming && !isPaused) {
      const currentTokensPerSecond = displayNumber;
      const currentWordsPerSecond = currentTokensPerSecond / tokensPerWord;
      const currentCharactersPerSecond = currentWordsPerSecond * averageWordLength;
      const currentAnimationInterval = 1000 / currentCharactersPerSecond;

      intervalId = setInterval(() => {
        setStreamingText(prev => {
          const newText = prev + fullText[streamingIndexRef.current];
          if (newText.length > 100) {
            return newText.slice(1);
          }
          return newText;
        });
        streamingIndexRef.current = (streamingIndexRef.current + 1) % fullText.length;
      }, currentAnimationInterval);
    }

    return () => clearInterval(intervalId);
  }, [shouldStartStreaming, isPaused, displayNumber]);

  const handleToggle = () => {
    setIsPaused(prevState => {
      const newPausedState = !prevState;

      if (!newPausedState && hasCompleted) {
        setDisplayNumber(tokensPerSecond);
      } else if (newPausedState && hasCompleted) {
        setDisplayNumber(0);
      }

      return newPausedState;
    });

    console.log(isPaused ? 'Resumed' : 'Paused');
  };

  const totalTiles = 10;
  const tileSize = 28;
  const gap = 2;

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

    // Add percentage text after the last tile
    tiles.push(
      <text
        key="percentage"
        x={totalTiles * (tileSize + gap) + 10} // Increased space by 10px
        y={tileSize / 2}
        dy="0.35em"
        className="progress-percentage"
        textAnchor="start"
      >
        {`${Math.round(progress)}`} {/* Removed the percentage symbol */}
      </text>
    );

    return tiles;
  };

  const svgWidth = totalTiles * (tileSize + gap) + 50; // Increased width to accommodate percentage text

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
        <div className="streaming-text-container">
          <div className="streaming-text">
            {streamingText}
          </div>
        </div>
      </main>
      <footer>
        <p>
        On-device AI inference engine built with Rust, WebAssembly, and WebGPU, demoed
          using{' '}
          <a
            href="https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Llama 3.2 3B
          </a>{''}
          .
        </p>
        <p>
          Work in progress, designed for an intelligence age browser by{' '}
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