# NexTrip Hero Section

A premium international education platform hero section built with Next.js, React Three Fiber, TypeScript, and Tailwind CSS.

## Overview

NexTrip is a premium international education platform that helps students discover universities, scholarships, and study-abroad opportunities worldwide. This hero section represents the pinnacle of premium digital design, combining Apple's clean aesthetic, SpaceX's futuristic storytelling, and Vercel's elegance.

## Features

- **Premium 3D Globe Visualization** using React Three Fiber
- **Smooth GSAP Animations** with ScrollTrigger
- **Responsive Design** for all devices
- **Accessibility Optimized**
- **Performance Optimized**
- **SEO Optimized**

## Tech Stack

### Core Framework
- Next.js 15.3+
- React 19+
- TypeScript 5.8+

### 3D Visualization
- Three.js
- @react-three/fiber
- @react-three/drei

### Animations
- GSAP 3.13+
- Framer Motion 12+
- Lenis for smooth scrolling

### UI/UX
- Tailwind CSS 4
- Custom design system

### Icons
- Phosphor Icons React

### Tools
- clsx, tailwind-merge for utilities

## Design Philosophy

### Premium Experience
- Luxurious visual hierarchy
- Cinematic animations
- Micro-interactions that delight
- Seamless scrolling experience

### Brand Alignment
- Apple-inspired minimalism
- SpaceX futuristic aesthetics
- Stripe design quality
- Vercel elegance

## Components

### Hero Section (/src/components/hero/)
- `Hero.tsx` - Main hero container and animations
- `HeroGlobe.tsx` - 3D globe visualization component
- `HeroContent.tsx` - Text content and CTA buttons
- `HeroStats.tsx` - Floating statistics panel
- `index.ts` - Component exports

### Navigation (/src/components/navbar/)
- `Navbar.tsx` - Responsive navigation bar

### UI Components (/src/components/ui/)
- `CTAButton.tsx` - Custom CTA button component
- `theme.config.ts` - Tailwind design system configuration

### Animations (/src/animations/)
- `gsap.ts` - GSAP animation configurations

### Application (/src/app/)
- `page.tsx` - Home page with hero section

## Color System

Primary Colors:
- Primary Navy: `#0A3D91`
- Royal Blue: `#1D5FD1`
- Deep Background: `#071A52`
- Innovation Cyan: `#00D9FF`
- Accent Red: `#D81F2A`

Background Gradients:
- `linear-gradient(135deg, #071A52, #0A3D91, #00D9FF)`

## Typography

### Display (Hero Heading)
- Font: Instrument Serif
- Size: 96px desktop, 72px tablet, 48px mobile
- Weight: Regular/Medium
- Letter Spacing: -4%
- Line Height: 95%

### Body Text
- Font: Inter
- Size: 20px desktop, 18px mobile
- Weight: 400-500
- Line Height: 160%

## Layout

### Desktop (12-column grid)
- Maximum width: 1280px
- Padding: 64px
- Content columns: 5 (left) + 7 (right)

### Mobile
- Stacked layout for better readability
- Full-width buttons
- Optimized touch interactions

## Animations

### GSAP Timeline
- **0s**: Background fade in
- **0.4s**: Navbar appears
- **0.7s**: Globe scales in
- **1s**: Headline reveal
- **1.3s**: Description reveal
- **1.5s**: Buttons reveal
- **2s**: Stats appear

### 3D Globe Animations
- Continuous slow rotation
- Particle system with movement
- Dynamic city markers
- Orbiting flight paths

## Performance

### Optimization
- Suspense boundaries for loading states
- Lazy loading for 3D assets
- Limited to 2x DPR for mobile
- Disabled unnecessary shadows
- React.memo for component optimization
- Frame throttling for 3D updates

### Bundle Size
- Optimized imports
- Tree-shaking enabled
- Component code splitting

## Accessibility

### WCAG Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Reduced motion support

### Screen Reader Support
- Proper heading hierarchy
- Descriptive alt text for 3D elements
- Focus management for interactive elements

## SEO

### Meta Tags
- Title: "NexTrip | Your Gateway To Global Education"
- Description: "Discover universities, scholarships and study abroad opportunities worldwide."

### Schema
- JSON-LD for organization
- Open Graph for social sharing

## Building and Running

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Production Start
```bash
pnpm start
```

### Type Checking
```bash
pnpm typecheck
```

### Linting
```bash
pnpm lint
```

## Development Server Features

### Auto-refresh
- Hot module replacement for rapid development
- Real-time 3D preview
- Live CSS changes

### Performance Profiling
- Built-in React DevTools integration
- Performance monitoring
- Bundle analyzer (optional)

## Production Features

### Image Optimization
- Next.js Image component
- Automatic responsive images
- WebP support

### Static Generation
- Incremental static regeneration
- Static site generation
- Dynamic routes for specific pages

### Security
- CORS configuration
- Security headers
- Content Security Policy

## Customization

### Colors
Update colors in `/src/components/ui/theme.config.ts`

### Typography
Update font faces in `/src/app/page.tsx`

### Animations
Modify GSAP timelines in `/src/animations/gsap.ts`

### 3D Assets
Update globe geometry in `/src/components/hero/HeroGlobe.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code style
4. Add tests for new components
5. Update documentation
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to the open source community and the contributors who made this premium experience possible.

## Contact

For inquiries, please visit https://nextrp.com or contact support@nextrp.com

---

*This document is part of the NexTrip premium digital experience. Built with attention to detail and designed for excellence.*
# nextrip
# nextrip
