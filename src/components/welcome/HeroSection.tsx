import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 to-black/80 mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
          Never Take Meeting Notes Again
        </h1>
        <p className="text-xl text-black mb-8 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
          Transform your meetings with AI-powered transcription, summaries, and insights.
          Focus on the conversation while we handle the documentation.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full 
                   text-lg font-medium hover:from-indigo-500 hover:to-indigo-600 transition-all
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
        >
          Start for Free
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-x" />
    </div>
  );
}