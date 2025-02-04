import React, { useEffect, useRef, useState } from 'react';

interface ParallaxHeroProps {
  onLoad?: () => void;
}

export function ParallaxHero({ onLoad }: ParallaxHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80';
    image.onload = () => {
      setImageLoaded(true);
      onLoad?.();
    };
  }, [onLoad]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={parallaxRef}
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateZ(0)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
    </div>
  );
}