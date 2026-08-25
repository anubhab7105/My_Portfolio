'use client';

import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

export default function RobotHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const app = new Application(canvas);

    let isMounted = true;

    app
      .load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode')
      .then(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load Spline scene:', err);
      });

    return () => {
      isMounted = false;
      try {
        app.dispose();
      } catch {
        // ignore cleanup errors on unmount
      }
    };
  }, []);

  return (
    <div className="robot-hero-container">
      {isLoading && (
        <div className="robot-hero-loading">
          <div className="loading-spinner" />
          <span className="loading-text">Loading 3D Robot...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />
    </div>
  );
}
