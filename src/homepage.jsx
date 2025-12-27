import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AuraFlowLanding = () => {
  const soundWaveRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Interactive Sound Bars logic (random heights for natural feel)
    const interval = setInterval(() => {
      if (soundWaveRef.current) {
        const bars = soundWaveRef.current.querySelectorAll('.wave-bar');
        bars.forEach(bar => {
          const height = Math.floor(Math.random() * 40) + 10;
          bar.style.height = `${height}px`;
        });
      }
    }, 300);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="selection:bg-indigo-100 selection:text-indigo-900 font-['Plus_Jakarta_Sans',_sans-serif] bg-white overflow-x-hidden">
      {/* Custom Styles for Glassmorphism and Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0');

        .glass-panel {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }

        /* Shimmer/Shine effect for buttons */
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(200%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .btn-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(-15deg);
          animation: shimmer 2.0s ease-in-out infinite;
        }
        /* Shimmer only on hover */
        .btn-shimmer-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(-15deg);
        }
        .btn-shimmer-hover:hover::before {
          animation: shimmer 0.8s ease-in-out;
        }

        /* Shake head animation on hover */
        @keyframes shake-head {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-5deg); }
          40% { transform: rotate(5deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        .shake-on-hover:hover {
          animation: shake-head 0.5s ease-in-out;
        }

        .text-gradient {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blob-bg {
          position: absolute;
          width: 800px;
          height: 800px;
          filter: blur(80px);
          z-index: -1;
          opacity: 0.4;
          animation: float-blob 20s infinite alternate cubic-bezier(0.45, 0, 0.55, 1);
        }

        @keyframes float-blob {
          0% { transform: translate(-10%, -10%) scale(1) rotate(0deg); }
          100% { transform: translate(15%, 15%) scale(1.3) rotate(180deg); }
        }

        .float-fast { animation: floating 4s infinite ease-in-out; }
        .float-slow { animation: floating 7s infinite ease-in-out; }
        .float-delayed { animation: floating 6s infinite ease-in-out -2s; }

        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }

        .gradient-border {
          position: relative;
          background: white;
          padding: 2px;
          border-radius: 2rem;
        }

        .gradient-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 2rem;
          padding: 2px; 
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Float Animations for shim(2) style */
        .float-1 { animation: float-anim 6s infinite ease-in-out; }
        .float-2 { animation: float-anim 8s infinite ease-in-out -2s; }
        .float-3 { animation: float-anim 7s infinite ease-in-out -4s; }

        @keyframes float-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        /* Wave Container */
        .wave-container {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 40px;
        }

        .wave-bar {
          animation: wave-play 0.8s infinite ease-in-out alternate;
        }

        @keyframes wave-play {
          0% { height: 10px; }
          100% { height: 40px; }
        }

        /* Perspective Cards with smoother transitions */
        .perspective-container {
          perspective: 2000px;
          transform-style: preserve-3d;
        }
        .tilt-card {
          transform: rotateY(-8deg) rotateX(5deg);
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .tilt-card:hover {
          transform: rotateY(0deg) rotateX(0deg) scale(1.03);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced smooth transitions */
        .smooth-appear {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smoother float animations */
        @keyframes smooth-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
        .smooth-float { animation: smooth-float 8s infinite ease-in-out; }

        /* Glass style from shim(2) */
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        /* Blob from shim(2) */
        .blob {
          position: absolute;
          filter: blur(80px);
          z-index: -1;
          border-radius: 50%;
          opacity: 0.45;
          animation: blob-float 25s infinite alternate ease-in-out;
        }

        @keyframes blob-float {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(100px, -50px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-50px, 100px) scale(0.9) rotate(240deg); }
          100% { transform: translate(0, 0) scale(1) rotate(360deg); }
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link to="/" className="btn-shimmer shake-on-hover relative px-6 py-3 bg-slate-900 rounded-full flex items-center gap-3 transition-all duration-500 shadow-xl shadow-slate-400/20 overflow-hidden">
          
            <span className="text-xl font-extrabold tracking-tighter text-white relative z-10">Aura Flow</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1 glass-panel px-2 py-1.5 rounded-full transition-all duration-1000 opacity-100 translate-y-0">
            <a href="#how" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#features" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#creators" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">For Creators</a>
          </div>

          <div className="glass-panel px-1.5 py-1.5 rounded-full transition-all duration-1000 opacity-100 translate-y-0">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-12 overflow-hidden flex flex-col items-center">
        {/* Animated Background Blobs */}
        <div className="blob-bg top-0 -left-20 bg-indigo-200"></div>
        <div className="blob-bg bottom-0 -right-20 bg-cyan-100" style={{ animationDelay: '-10s' }}></div>
        <div className="blob-bg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-100 opacity-20"></div>

        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10 mt-4">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-10 text-center lg:text-left">
           

            <h1 className="text-6xl md:text-6xl font-black tracking-tight leading-[0.95] text-slate-900">
              One Voice.<br />
              <span className="text-gradient">Every Language.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Instantly clone your voice for video translation. Reach billions of viewers in their native tongue without recording a single extra word.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/studio" className="btn-shimmer-hover group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl shadow-slate-400/30 cursor-pointer flex items-center gap-3">
                <span className="material-symbols-outlined text-white relative z-10">play_circle</span>
                <span className="relative z-10">See Magic</span>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-slate-100">
              <div>
                <p className="text-3xl font-black text-slate-900">40+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Languages</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-black text-slate-900">99%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Voice Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right Visual Scene */}
          <div className="lg:col-span-6 relative [perspective:2000px] h-[600px] flex items-center justify-center">
            {/* Main Image Card */}
            <div className="relative z-30 transition-all duration-1000 opacity-100 translate-y-0 w-full max-w-[320px] [transform:rotateY(-15deg)_rotateX(10deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1.05)]">
              <div className="gradient-border shadow-2xl">
                <div className="rounded-[1.9rem] overflow-hidden aspect-[9/16] relative bg-slate-100">
                  <img src="/user.png" alt="Main Creator" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
                    <div className="glass-panel py-3 px-4 rounded-xl inline-block animate-on-scroll opacity-0 translate-y-10">
                      <p className="text-sm font-bold text-slate-900">Hello, I'm reaching you globally!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Language Cards */}
            <div className="absolute -left-10 top-0 z-20 float-slow w-48 hidden md:block">
              <div className="glass-panel p-2 rounded-3xl shadow-2xl rotate-[-10deg] animate-on-scroll opacity-100 translate-y-0">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" alt="Spanish Version" className="w-full aspect-square rounded-2xl object-cover mb-3" />
                <div className="flex items-center gap-2 px-2 pb-1">
                  <span className="text-lg">🇪🇸</span>
                  <span className="text-xs font-bold text-slate-800 tracking-tight">¡Hola a todos!</span>
                </div>
              </div>
            </div>

            <div className="absolute -right-16 bottom-10 z-20 float-delayed w-48 hidden md:block">
              <div className="glass-panel p-2 rounded-3xl shadow-2xl rotate-[8deg] animate-on-scroll opacity-0 translate-y-10">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="Japanese Version" className="w-full aspect-square rounded-2xl object-cover mb-3" />
                <div className="flex items-center gap-2 px-2 pb-1">
                  <span className="text-lg">🇯🇵</span>
                  <span className="text-xs font-bold text-slate-800 tracking-tight">こんにちは、世界</span>
                </div>
              </div>
            </div>

            {/* Audio Wave Widget */}
            <div className="absolute top-1/4 -right-10 z-40 float-fast glass-panel p-6 rounded-[2rem] shadow-xl border-l-4 border-indigo-500 animate-on-scroll opacity-100 translate-y-0">
              <div className="flex items-center gap-4">
                <div ref={soundWaveRef} className="flex items-end gap-[2px] h-[60px]">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="wave-bar w-[3px] bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full transition-all duration-300" style={{ height: '20px' }} />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Voice Match</p>
                  <p className="text-sm font-bold text-slate-800">Perfect Sync</p>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 w-[500px] h-[500px] border-2 border-indigo-50 rounded-full flex items-center justify-center">
              <div className="w-[400px] h-[400px] border border-indigo-100/50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Dubbing Studio Section */}
      <section className="py-32 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden" id="how">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4 animate-on-scroll opacity-0 translate-y-12">
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Powerful Studio</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Your AI Dubbing Command Center</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Upload once, generate multiple audio tracks in different languages with your exact voice signature.</p>
          </div>

          <div className="relative max-w-5xl mx-auto h-[650px] perspective-container">
            {/* Main Mockup */}
            <div className="absolute inset-0 flex items-center justify-center z-20 tilt-card">
              <div className="w-full max-w-2xl rounded-[3rem] overflow-hidden glass p-4 shadow-2xl shadow-indigo-100/50 border-white transition-all duration-1000 animate-on-scroll opacity-0 translate-y-12">
                <img src="/barrier.png" alt="AI Dubbing Dashboard" className="rounded-[2rem] w-full shadow-inner" />
              </div>
            </div>

            {/* Floating Audio Track Cards */}
            <div className="absolute -left-10 top-0 z-30 float-1 hidden lg:block">
              <div className="glass p-3 rounded-[2rem] shadow-2xl w-48 border-l-4 border-indigo-400 animate-on-scroll opacity-0 translate-y-12">
                <img src="/clar.png" alt="Original" className="rounded-2xl w-full mb-3" />
                <div className="flex items-center gap-2 px-2">
                  <span className="text-xl">�🇷</span>
                  <span className="text-xs font-bold text-slate-800">Bonjour le monde!</span>
                </div>
              </div>
            </div>

            <div className="absolute -right-12 top-1/4 z-30 float-2 hidden lg:block">
              <div className="glass p-3 rounded-[2rem] shadow-2xl w-48 border-l-4 border-cyan-400 animate-on-scroll opacity-0 translate-y-12">
                <img src="/pep.png" alt="Portuguese" className="rounded-2xl w-full mb-3" />
                <div className="flex items-center gap-2 px-2">
                  <span className="text-xl">🇧🇷</span>
                  <span className="text-xs font-bold text-slate-800">Olá mundo!</span>
                </div>
              </div>
            </div>

            <div className="absolute left-1/4 -bottom-10 z-40 float-3 hidden lg:block">
              <div className="glass p-4 rounded-3xl shadow-xl flex items-center gap-4 animate-on-scroll opacity-0 translate-y-12">
                <div className="wave-container">
                  <div className="wave-bar bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full w-[3px]" style={{ animationDelay: '0.1s', height: '26px' }}></div>
                  <div className="wave-bar bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full w-[3px]" style={{ animationDelay: '0.3s', height: '30px' }}></div>
                  <div className="wave-bar bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full w-[3px]" style={{ animationDelay: '0.2s', height: '31px' }}></div>
                  <div className="wave-bar bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full w-[3px]" style={{ animationDelay: '0.5s', height: '33px' }}></div>
                  <div className="wave-bar bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-full w-[3px]" style={{ animationDelay: '0.4s', height: '36px' }}></div>
                </div>
                <div className="text-left pr-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-Agent AI</p>
                  <p className="text-sm font-bold text-slate-800">Parallel Processing</p>
                </div>
              </div>
            </div>

            {/* Abstract Decorations */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] h-[120%] border border-slate-200/50 rounded-full -z-10 pointer-events-none opacity-20"></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] h-[150%] border border-slate-200/30 rounded-full -z-10 pointer-events-none opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Multiplatform Publishing Section */}
      <section className="py-32 bg-white relative overflow-hidden" id="creators">
        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-on-scroll opacity-0 translate-y-12">
            <h2 className="text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Publish Everywhere.<br />
              <span className="text-indigo-600">Connect Globally.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Seamlessly distribute your multilingual content across YouTube, TikTok, Instagram, LinkedIn, and Facebook. One upload, infinite reach across every major platform.
            </p>
            <div className="grid gap-6">
              <div className="flex items-start gap-4 p-6 glass rounded-3xl shadow-sm border-indigo-50 animate-on-scroll opacity-0 translate-y-12">
                <div className="bg-indigo-600 text-white p-3 rounded-2xl">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Cross-Platform Sync</h4>
                  <p className="text-slate-500">Auto-format and publish to Instagram Reels, YouTube Shorts, TikTok, and LinkedIn simultaneously.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 glass rounded-3xl shadow-sm border-cyan-50 animate-on-scroll opacity-0 translate-y-12">
                <div className="bg-cyan-500 text-white p-3 rounded-2xl">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Multi-Agent Technology</h4>
                  <p className="text-slate-500">Our AI agents work in parallel to translate, dub, and optimize your content for each platform's algorithm.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="space-y-6 pt-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-all">
                <img src="/inst.png" alt="Creator 1" className="w-full h-72 object-cover" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                 <span className="text-slate-500">JP</span>
                  <span className="text-slate-800">JAPANESE</span>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all">
                <img src="/c3.png" alt="Creator 2" className="w-full h-72 object-cover" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
 <span className="text-slate-500">US</span>
                  <span className="text-slate-800">ENGLISH</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-all">
                <img src="/french.png" alt="Creator 3" className="w-full h-72 object-cover" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-slate-500">FR</span>
                  <span className="text-slate-800">FRENCH</span>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all">
                <img src="/c4.png" alt="Creator 4" className="w-full h-72 object-cover" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                                 <span className="text-slate-500">ES</span>
                  <span className="text-slate-800">SPANISH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Storytelling - Cards */}
      <section className="py-32 relative bg-slate-50/50 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900">Your Content, Reimagined.</h2>
            <p className="text-lg text-slate-500 font-medium">Capture once. Publish in forty languages.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-4">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" alt="Original Persona" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 text-white">
                <span className="material-symbols-outlined text-4xl text-indigo-400 mb-4">person_play</span>
                <h3 className="text-2xl font-extrabold mb-2">Original Persona</h3>
                <p className="text-slate-300 text-sm leading-relaxed">We keep your original facial expressions and tone, ensuring you remain authentic to your brand.</p>
              </div>
            </div>

            <div className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-4 md:mt-10">
              <img src="/trans.png" alt="Language Flow" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 text-white">
                <span className="material-symbols-outlined text-4xl text-violet-400 mb-4">translate</span>
                <h3 className="text-2xl font-extrabold mb-2">Infinite Translation</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Our AI translates with context-awareness, handling slang and cultural references like a native.</p>
              </div>
            </div>

            <div className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-4">
              <img src="/audi.png" alt="Global Reach" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-cyan-900/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 text-white">
                <span className="material-symbols-outlined text-4xl text-cyan-400 mb-4">public</span>
                <h3 className="text-2xl font-extrabold mb-2">Limitless Audience</h3>
                <p className="text-slate-300 text-sm leading-relaxed">From São Paulo to Seoul, your videos will find their fans without language being a wall.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-6" id="features">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl space-y-4">
              <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Key Features</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Advanced AI that works<br />as hard as you do.</h2>
            </div>
            <button className="px-8 py-4 glass-panel text-indigo-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all animate-on-scroll opacity-0 translate-y-10">
              Explore all Features
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-panel p-10 rounded-[3rem] relative overflow-hidden group transition-all animate-on-scroll opacity-0 translate-y-10">
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <span className="material-symbols-outlined text-3xl">radio_button_unchecked</span>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">Zero-Shot Voice Cloning</h3>
                <p className="text-slate-500 max-w-md">No need for hours of recording. Upload just 30 seconds of video, and AuraFlow generates a perfect digital twin of your voice in any language.</p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity translate-y-20">
                <span className="material-symbols-outlined text-[300px]">waves</span>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] group hover:bg-white transition-all animate-on-scroll opacity-0 translate-y-10">
              <span className="material-symbols-outlined text-4xl text-cyan-500 mb-6">subtitles</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Smart Subtitles</h3>
              <p className="text-slate-500">Subtitles are not just translated; they are natively localized to fit the rhythm and cadence of the speech.</p>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] group hover:bg-white transition-all animate-on-scroll opacity-0 translate-y-10">
              <span className="material-symbols-outlined text-4xl text-violet-500 mb-6">bolt</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Lightning Rendering</h3>
              <p className="text-slate-500">Our cloud processing handles 4K videos in minutes, not hours. Perfect for short-form creators on a schedule.</p>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] group hover:bg-white transition-all animate-on-scroll opacity-0 translate-y-10">
              <span className="material-symbols-outlined text-4xl text-amber-500 mb-6">check_circle</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Lip-Sync Ready</h3>
              <p className="text-slate-500">Experimental lip-sync coming soon to perfectly match your translated speech with facial movements.</p>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] group hover:bg-white transition-all animate-on-scroll opacity-0 translate-y-10">
              <span className="material-symbols-outlined text-4xl text-emerald-500 mb-6">auto_awesome_motion</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Multi-Format Export</h3>
              <p className="text-slate-500">Directly export for TikTok, Reels, or Shorts with pre-formatted aspect ratios and burnt-in captions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-32 px-6 bg-slate-50 overflow-hidden relative">
        <div className="blob absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-200 opacity-30"></div>
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          <div className="text-center space-y-4 animate-on-scroll opacity-0 translate-y-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Built for the next generation of storytellers.</h2>
            <p className="text-slate-500 text-lg">AuraFlow scales your personality across borders.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* YouTubers */}
            <div className="group relative overflow-hidden rounded-[2rem] h-[400px] shadow-lg animate-on-scroll opacity-0 translate-y-12">
              <img src="/y1.png" alt="YouTubers" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
                <h4 className="text-2xl font-bold">YouTubers</h4>
                <p className="text-sm opacity-80">Localize your shorts and reach 10x more viewers.</p>
              </div>
            </div>

            {/* Influencers */}
            <div className="group relative overflow-hidden rounded-[2rem] h-[400px] shadow-lg animate-on-scroll opacity-0 translate-y-12" style={{ transitionDelay: '100ms' }}>
              <img src="/in.png" alt="Influencers" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
                <h4 className="text-2xl font-bold">Influencers</h4>
                <p className="text-sm opacity-80">Build a global community without learning new languages.</p>
              </div>
            </div>

            {/* Educators */}
            <div className="group relative overflow-hidden rounded-[2rem] h-[400px] shadow-lg animate-on-scroll opacity-0 translate-y-12" style={{ transitionDelay: '200ms' }}>
              <img src="/edu.png" alt="Educators" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
                <h4 className="text-2xl font-bold">Educators</h4>
                <p className="text-sm opacity-80">Make knowledge accessible to students worldwide.</p>
              </div>
            </div>

            {/* Global Brands */}
            <div className="group relative overflow-hidden rounded-[2rem] h-[400px] shadow-lg animate-on-scroll opacity-0 translate-y-12" style={{ transitionDelay: '300ms' }}>
              <img src="/bis.png" alt="Global Brands" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
                <h4 className="text-2xl font-bold">Global Brands</h4>
                <p className="text-sm opacity-80">Consistent communication across all international offices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg">radio_button_unchecked</span>
                </div>
                <span className="text-2xl font-black tracking-tighter">AUREX</span>
              </div>
              <p className="text-slate-500 max-w-sm">Leading the revolution in creator accessibility. Our mission is to break down language barriers through human-centric AI.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Voice Cloning</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Video Translation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Subtitle Generator</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Aurex</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2024 AUREX TECHNOLOGIES. LONDON, UK.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all animate-on-scroll opacity-0 translate-y-10">
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all animate-on-scroll opacity-0 translate-y-10">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuraFlowLanding;