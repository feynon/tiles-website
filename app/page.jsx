'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTiles, setActiveTiles] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false); // New state to track completion
  const [streamingText, setStreamingText] = useState('');
  const [shouldStartStreaming, setShouldStartStreaming] = useState(false);
  const streamingIndexRef = useRef(0);
  const fullText = 'Sanremo Music Festival (Festival di Sanremo) is an annual Italian music competition held in the city of Sanremo since 1951. It\'s considered one of the most prestigious and influential events in the Italian music scene. The festival features both newcomers and established artists competing for various awards, including the Big Award (Gran Premio), which grants the winner the right to represent Italy in the Eurovision Song Contest. The event consists of several live shows where artists perform their original songs, and a jury composed of musicians, critics, and the public determines the winners through a combination of points.';
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

  const [tileSize, setTileSize] = useState(28);
  const [gap, setGap] = useState(2);
  const totalTiles = 10;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 480) {
        setTileSize(18);
        setGap(1);
      } else if (window.innerWidth <= 768) {
        setTileSize(22);
        setGap(1);
      } else {
        setTileSize(28);
        setGap(2);
      }
    }

    handleResize(); // Call once to set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        x={totalTiles * (tileSize + gap) + 10}
        y={tileSize / 2}
        dy="0.35em"
        className="progress-percentage"
        textAnchor="start"
      >
        {`${Math.round(progress)}`}
      </text>
    );

    return tiles;
  };

  const svgWidth = totalTiles * (tileSize + gap) + 50;

  useEffect(() => {
    function setupStreamingText() {
      const container = document.querySelector('.streaming-text-container');
      if (container) {
        // Ensure the container respects the CSS width and padding
        container.style.width = '90%';
      }
    }

    setupStreamingText();
  }, []);

  return (
    <>
      <Head>
        <title>Tiles</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="256" height="256" viewBox="0 0 256.000000 256.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
            fill="#F00" stroke="none">
              <path d="M0 2135 l0 -425 855 0 855 0 0 -430 0 -430 425 0 425 0 0 430 0 430
              -425 0 -425 0 0 425 0 425 -855 0 -855 0 0 -425z"/>
              <path d="M0 425 l0 -425 430 0 430 0 0 425 0 425 -430 0 -430 0 0 -425z"/>
            </g>
          </svg>
        </div>
        <div className={styles['progress-bar-container']}>
          <svg
            className={styles.progressLogo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${svgWidth} ${tileSize}`}
            aria-label="Download Progress"
          >
            <g>{generateTiles()}</g>
          </svg>
        </div>
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
        On-device ML inference engine built with Rust, WebAssembly, and WebGPU, conformant with{' '}
          <a
            href="https://github.com/meta-llama/llama-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            Llama Stack API{' '} 
          </a>
          spec.
        </p>
        <p>
        Tiles is a collection of prototypical artifacts designed for an intelligence-age browser. Currently a WIP, the project is not yet functional.{' '}
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