# Anubhab Das Portfolio

Professional portfolio website of Anubhab Das, Cyber Security student and web developer. Rebuilt from a legacy static site to a modern, security-first web application.

## Features
- **Security-First Architecture**: Implemented with security headers (CSP, Frame options, XSS protection), secure Formspree integration with client-side status handling, and design patterns aligned with the OWASP Top 10 guidelines.
- **Interactive 3D Hero Scene**: Implements Spline as an animated background behind the main hero section for a premium interactive cybersecurity theme.
- **Dynamic Projects & Publications**: Managed via fully typed TypeScript models and datasets.
- **Aesthetic Cyberpunk / Terminal Glow Theme**: Custom dark theme styled using Tailwind CSS v4 and vanilla CSS tokens for a polished terminal design.
- **Modern Performance**: Zero-CLS layout shifts, lazy-loaded interactive components, and optimized Next.js Image components.
- **SEO & Accessibility**: Complete semantic HTML5 structure, structured JSON-LD schema metadata, dynamic robots.txt, and sitemap generation.

## Technologies Used
- **Core Framework**: Next.js 16 (App Router) with React 19 & TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS & CSS variable overrides
- **Animations & Graphics**: Framer Motion & Spline (3D WebGL runtime)
- **Form Handling**: Formspree
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v18.x or later)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anubhab7105/My_Portfolio.git
   cd My_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. Build for production:
   ```bash
   npm run build
   ```