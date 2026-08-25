'use client';

import dynamic from 'next/dynamic';

// Import the main package; the path resolution will be aliased in next.config.ts
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

/**
 * SplineHero — Option C
 * Renders the Spline 3D scene as an absolutely-positioned background
 * behind the hero content (photo + terminal card).
 * Opacity is kept low (35%) so the hero text/visual remain the primary focus.
 *
 * The scene URL is a free public Spline scene (cyber-grid / neural network)
 * that fits the cybersecurity aesthetic. Replace with your own scene URL at any time.
 */
export default function SplineHero() {
  return (
    <div className="hero-spline-bg" aria-hidden="true">
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
