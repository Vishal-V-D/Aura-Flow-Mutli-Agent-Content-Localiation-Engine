import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, Maximize, Settings, Subtitles, 
  Palette, Zap, Globe, Share2, Plus, Search, 
  ZoomIn, ZoomOut, User, Menu, ChevronRight,
  Video, Music, Layers, Download, Type, Wand2, 
  FolderOpen, ChevronLeft, ChevronRight as ChevronRightIcon,
  Trash2, Copy, Eye, Sparkles, Smile, Cloud, Activity, Minimize2
} from 'lucide-react';

const AuraFlowStudioPro = () => {
  // --- UI STATES ---
  const [leftBarOpen, setLeftBarOpen] = useState(true);
  const [primarySidebarOpen, setPrimarySidebarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(true);
  const [sidebarContext, setSidebarContext] = useState('Text'); // Project, Media, Text, Effects, Colors
  const [activeTab, setActiveTab] = useState('Editor');
  
  // --- VIDEO STATES ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // --- CONTENT STATES (Lively Updates) ---
  const [activeLang, setActiveLang] = useState('ES');
  const [textStyle, setTextStyle] = useState('Modern'); // Modern, Neon, Bold, Elegant
  const [videoFilter, setVideoFilter] = useState('none'); // Cinematic, Vintage, B&W
  const [activeMagic, setActiveMagic] = useState(null);
  
  // Collapsible section states
  const [expandedSections, setExpandedSections] = useState({
    videos: true,
    audio: true,
    images: false,
    recent: true
  });
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const duration = 180; 
  const timelineRef = useRef(null);

  // Translations for Lively Update
  const translations = {
    ES: "Sube de nivel con el doblaje de AUREX AI 🚀",
    JP: "AUREX AIダビングでコンテンツをレベルアップ 🚀",
    DE: "Verbessern Sie Ihre Inhalte mit AUREX AI Dubbing 🚀",
    EN: "Level up your content with AUREX AI Dubbing 🚀"
  };

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Playback logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { setIsPlaying(false); return 100; }
          return prev + 0.1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTimelineClick = (e) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setProgress((x / rect.width) * 100);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden select-none">
      
      {/* 1. PRIMARY ICON SIDEBAR */}
      <aside className={`border-r border-slate-200 flex flex-col items-center py-6 gap-8 bg-white z-50 shadow-sm transition-all duration-300 ${primarySidebarOpen ? 'w-16' : 'w-0 overflow-hidden'}`}>
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 cursor-pointer hover:scale-105 transition-transform" onClick={() => setPrimarySidebarOpen(false)}>
          <Zap size={22} className="text-white fill-white" />
        </div>
        <div className="flex flex-col gap-6 text-slate-400">
          <SideIcon icon={<FolderOpen size={20} />} active={sidebarContext === 'Project'} onClick={() => setSidebarContext('Project')} />
          <SideIcon icon={<Type size={20} />} active={sidebarContext === 'Text'} onClick={() => setSidebarContext('Text')} />
          <SideIcon icon={<Palette size={20} />} active={sidebarContext === 'Colors'} onClick={() => setSidebarContext('Colors')} />
          <SideIcon icon={<Wand2 size={20} />} active={sidebarContext === 'Magic'} onClick={() => setSidebarContext('Magic')} />
        </div>
        <div className="mt-auto pb-4 flex flex-col gap-6 text-slate-300">
          <button onClick={() => setLeftBarOpen(!leftBarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
            {leftBarOpen ? <ChevronLeft size={20} /> : <ChevronRightIcon size={20} />}
          </button>
        </div>
      </aside>

      {/* Toggle to reopen Primary Sidebar */}
      {!primarySidebarOpen && (
        <button 
          onClick={() => setPrimarySidebarOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-r-xl shadow-xl z-[60] transition-all hover:pr-4"
        >
          <ChevronRightIcon size={18} className="text-white" />
        </button>
      )}

      {/* 2. DYNAMIC COLLAPSIBLE UTILITY PANEL */}
      <aside 
        className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${leftBarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white whitespace-nowrap">
          <h2 className="font-black text-xs uppercase tracking-widest text-slate-400">{sidebarContext} Tools</h2>
          <Search size={14} className="text-slate-300" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* TEXT TOOLSET */}
          {sidebarContext === 'Text' && (
            <div className="grid grid-cols-1 gap-3">
              <ToolCard title="Modern Sans" desc="Clean & Minimal" active={textStyle === 'Modern'} onClick={() => setTextStyle('Modern')} icon={<Type size={16}/>}/>
              <ToolCard title="Cyber Neon" desc="Glow & Pulse" active={textStyle === 'Neon'} onClick={() => setTextStyle('Neon')} icon={<Sparkles size={16}/>}/>
              <ToolCard title="Impact Bold" desc="Heavy Presence" active={textStyle === 'Bold'} onClick={() => setTextStyle('Bold')} icon={<Layers size={16}/>}/>
              <ToolCard title="Royal Serif" desc="Elegant & Slender" active={textStyle === 'Elegant'} onClick={() => setTextStyle('Elegant')} icon={<Copy size={16}/>}/>
            </div>
          )}

          {/* COLOR TOOLSET */}
          {sidebarContext === 'Colors' && (
            <div className="grid grid-cols-2 gap-3">
              <FilterBox label="Normal" filter="none" active={videoFilter === 'none'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
              <FilterBox label="Noir" filter="grayscale(100%)" active={videoFilter === 'grayscale(100%)'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
              <FilterBox label="Sepia" filter="sepia(80%)" active={videoFilter === 'sepia(80%)'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
              <FilterBox label="Cold" filter="hue-rotate(180deg) brightness(1.2)" active={videoFilter === 'hue-rotate(180deg) brightness(1.2)'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
              <FilterBox label="Vibrant" filter="saturate(200%)" active={videoFilter === 'saturate(200%)'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
              <FilterBox label="Warm" filter="contrast(1.1) sepia(20%)" active={videoFilter === 'contrast(1.1) sepia(20%)'} set={setVideoFilter} img="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100" />
            </div>
          )}

          {/* MAGIC AI TOOLSET */}
          {sidebarContext === 'Magic' && (
            <div className="space-y-4">
               <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                 <p className="text-[10px] font-black text-indigo-400 uppercase mb-3">AI Accelerators</p>
                 <MagicItem icon={<Smile/>} label="Face Tracking" active={activeMagic === 'face'} onClick={() => setActiveMagic('face')} />
                 <MagicItem icon={<Cloud/>} label="Background Remover" active={activeMagic === 'bg'} onClick={() => setActiveMagic('bg')} />
                 <MagicItem icon={<Activity/>} label="Lip Sync v2" active={activeMagic === 'lip'} onClick={() => setActiveMagic('lip')} />
               </div>
            </div>
          )}

          {sidebarContext === 'Project' && (
             <div className="space-y-3">
                {/* Videos Section - Collapsible */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleSection('videos')}
                    className="w-full p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Video size={14} className="text-indigo-500" />
                      <span className="text-[11px] font-black uppercase text-slate-600">Videos</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">3</span>
                    </div>
                    <ChevronRight size={14} className={`text-slate-400 transition-transform ${expandedSections.videos ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSections.videos && (
                    <div className="px-3 pb-3 space-y-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="p-2 bg-white border border-slate-100 rounded-lg flex items-center gap-3 hover:border-indigo-200 cursor-pointer transition-colors">
                          <div className="w-10 h-7 bg-slate-200 rounded overflow-hidden">
                            <img src={`https://picsum.photos/seed/${i+20}/100/100`} className="object-cover w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold truncate text-slate-700">Clip_Sequence_0{i}.mp4</div>
                            <div className="text-[9px] text-slate-400">00:45 • 24MB</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Audio Section - Collapsible */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleSection('audio')}
                    className="w-full p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Music size={14} className="text-purple-500" />
                      <span className="text-[11px] font-black uppercase text-slate-600">Audio</span>
                      <span className="text-[9px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-bold">2</span>
                    </div>
                    <ChevronRight size={14} className={`text-slate-400 transition-transform ${expandedSections.audio ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSections.audio && (
                    <div className="px-3 pb-3 space-y-2">
                      {['Voiceover_EN.wav', 'BGM_Ambient.mp3'].map((name, i) => (
                        <div key={i} className="p-2 bg-white border border-slate-100 rounded-lg flex items-center gap-3 hover:border-purple-200 cursor-pointer transition-colors">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <Volume2 size={14} className="text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold truncate text-slate-700">{name}</div>
                            <div className="text-[9px] text-slate-400">02:30 • 8MB</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images Section - Collapsible */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleSection('images')}
                    className="w-full p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-emerald-500" />
                      <span className="text-[11px] font-black uppercase text-slate-600">Images</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold">4</span>
                    </div>
                    <ChevronRight size={14} className={`text-slate-400 transition-transform ${expandedSections.images ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSections.images && (
                    <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square bg-white border border-slate-100 rounded-lg overflow-hidden hover:border-emerald-200 cursor-pointer transition-colors">
                          <img src={`https://picsum.photos/seed/${i+50}/100/100`} className="object-cover w-full h-full" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Files - Collapsible */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleSection('recent')}
                    className="w-full p-3 flex items-center justify-between hover:bg-indigo-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Eye size={14} className="text-indigo-500" />
                      <span className="text-[11px] font-black uppercase text-indigo-600">Recent</span>
                    </div>
                    <ChevronRight size={14} className={`text-indigo-400 transition-transform ${expandedSections.recent ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSections.recent && (
                    <div className="px-3 pb-3 space-y-1">
                      {['Final_Export.mp4', 'Draft_v2.mp4', 'Thumbnail.png'].map((name, i) => (
                        <div key={i} className="p-2 bg-white/60 rounded-lg flex items-center gap-2 text-[10px] font-bold text-indigo-700 hover:bg-white cursor-pointer transition-colors">
                          <FolderOpen size={12} />
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
             </div>
          )}
        </div>
      </aside>

      {/* 3. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* HEADER */}
        <header className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-40">
          <div className="flex items-center gap-8">
            <span className="font-black text-lg tracking-tighter text-slate-900">AURA<span className="text-indigo-600">FLOW</span></span>
            <nav className="flex bg-slate-100 p-1 rounded-lg">
              {['Editor', 'Assets', 'Collaborate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-tighter transition-all ${
                    activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
             {/* Collaborator Circles */}
             <div className="flex items-center -space-x-2">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">VD</div>
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">AK</div>
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">JS</div>
               <button className="w-8 h-8 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
                 <Plus size={14} />
               </button>
             </div>
             <div className="w-px h-6 bg-slate-200"></div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Cloud Synced
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-indigo-100 flex items-center gap-2">
               <Share2 size={14} /> Export
             </button>
          </div>
        </header>

        {/* EDITOR AREA */}
        <main className={`flex-1 overflow-y-auto p-6 transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100] bg-black p-0' : ''}`}>
          
          {/* EDITOR TAB CONTENT */}
          {activeTab === 'Editor' && (
          <div className={`max-w-5xl mx-auto space-y-6 ${isFullscreen ? 'max-w-none h-full' : ''}`}>
            
            {/* VIDEO PLAYER CONTAINER */}
            <div className={`relative aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-black shadow-2xl transition-all duration-700 ${isFullscreen ? 'rounded-none border-none h-full' : ''}`}>
              
              {/* THE VIDEO ELEMENT (Simulated) */}
              <div 
                className="w-full h-full transition-all duration-500 ease-in-out"
                style={{ filter: videoFilter }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover opacity-80 scale-105" 
                  alt="Video"
                />
              </div>

              {/* LIVELY TEXT OVERLAY */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-12 text-center">
                 <div className={`transition-all duration-500 transform ${isPlaying ? 'scale-105 opacity-100' : 'scale-100 opacity-90'} 
                   ${textStyle === 'Neon' ? 'text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)] font-black italic underline' : ''}
                   ${textStyle === 'Bold' ? 'text-white font-black text-5xl uppercase tracking-tighter' : ''}
                   ${textStyle === 'Modern' ? 'text-white font-bold text-3xl bg-indigo-600 px-6 py-2 rounded-xl shadow-2xl' : ''}
                   ${textStyle === 'Elegant' ? 'text-white font-serif italic text-4xl border-b-2 border-white pb-2' : ''}
                 `}>
                   {translations[activeLang]}
                 </div>
              </div>

              {/* PLAY/PAUSE OVERLAY CENTER */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white/30 transition-all pointer-events-auto group"
                >
                  {isPlaying ? 
                    <Pause size={32} className="text-white drop-shadow-lg" fill="white"/> : 
                    <Play size={32} className="text-white drop-shadow-lg ml-1" fill="white"/>
                  }
                </button>
              </div>

              {/* EXPAND BUTTON - TOP RIGHT */}
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-black/60 transition-all"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize size={18} />}
              </button>

              {/* LIVE TIMELINE AT BOTTOM */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                {/* Timeline Progress Bar */}
                <div className="relative mb-3">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setProgress((x / rect.width) * 100);
                  }}>
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                  {/* Playhead Indicator */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-indigo-500/50 border-2 border-indigo-500 transition-all" 
                    style={{ left: `${progress}%`, marginLeft: '-6px' }}
                  ></div>
                  {/* Live Scrubber Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-indigo-400 shadow-lg shadow-indigo-400/50" 
                    style={{ left: `${progress}%`, height: '200%', top: '-50%' }}
                  ></div>
                </div>
                
                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 bg-white text-indigo-600 rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                      {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor" className="ml-0.5"/>}
                    </button>
                    <div className="flex items-center gap-2 text-white/80">
                      <Volume2 size={16} className="cursor-pointer hover:text-white" />
                      <div className="w-16 h-1 bg-white/20 rounded-full">
                        <div className="w-3/4 h-full bg-white/60 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-xs">{formatTime(progress * duration / 100)}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/60 font-mono text-xs">{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/70">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                      <Settings size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                      <Subtitles size={16} />
                    </button>
                    <button 
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isFullscreen ? <Minimize2 size={16} /> : <Maximize size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            {!isFullscreen && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white rounded-lg text-slate-400"><Search size={16}/></button>
                    <button className="p-2 hover:bg-white rounded-lg text-slate-400"><ZoomIn size={16}/></button>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Master Timeline Sync</div>
                  <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs font-bold bg-indigo-50 px-3 py-1 rounded-full">
                    00:45:12
                  </div>
                </div>

                <div className="p-6 space-y-3 relative" ref={timelineRef} onClick={handleTimelineClick}>
                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 w-px bg-indigo-500 z-30 pointer-events-none" style={{ left: `${progress}%` }}>
                    <div className="absolute -top-1 -left-2 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-xl"></div>
                  </div>

                  <TimelineTrack icon={<Video size={12}/>} label="Video v1" color="bg-slate-200" width="w-[70%]" />
                  <TimelineTrack icon={<Volume2 size={12}/>} label="Dubbing" color="bg-indigo-100" border="border-indigo-200 shadow-inner" width="w-[90%]" isAudio />
                  <TimelineTrack icon={<Subtitles size={12}/>} label="Captions" color="bg-purple-100" border="border-purple-200" width="w-[50%]" />
                </div>
              </div>
            )}
          </div>
          )}

          {/* ASSETS TAB CONTENT */}
          {activeTab === 'Assets' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">Media Library</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input type="text" placeholder="Search assets..." className="bg-transparent outline-none text-sm w-48" />
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <Plus size={14} /> Upload
                  </button>
                </div>
              </div>

              {/* Asset Categories */}
              <div className="flex gap-2">
                {['All', 'Videos', 'Audio', 'Images', 'Fonts'].map((cat) => (
                  <button key={cat} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${cat === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Asset Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'Intro_Clip.mp4', type: 'video', size: '24.5 MB', thumb: 'https://picsum.photos/seed/v1/200/120' },
                  { name: 'Background_Music.mp3', type: 'audio', size: '8.2 MB', thumb: null },
                  { name: 'Logo_White.png', type: 'image', size: '1.2 MB', thumb: 'https://picsum.photos/seed/i1/200/120' },
                  { name: 'Outro_Animation.mp4', type: 'video', size: '18.7 MB', thumb: 'https://picsum.photos/seed/v2/200/120' },
                  { name: 'Voiceover_EN.wav', type: 'audio', size: '12.4 MB', thumb: null },
                  { name: 'Thumbnail_1.jpg', type: 'image', size: '2.1 MB', thumb: 'https://picsum.photos/seed/i2/200/120' },
                  { name: 'B-Roll_City.mp4', type: 'video', size: '45.3 MB', thumb: 'https://picsum.photos/seed/v3/200/120' },
                  { name: 'SFX_Whoosh.mp3', type: 'audio', size: '0.8 MB', thumb: null },
                ].map((asset, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group">
                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                      {asset.thumb ? (
                        <img src={asset.thumb} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={asset.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                          <Music size={32} className="text-indigo-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-[9px] font-bold text-white uppercase">
                        {asset.type}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-slate-900 truncate">{asset.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{asset.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COLLABORATE TAB CONTENT */}
          {activeTab === 'Collaborate' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">Team Workspace</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Plus size={14} /> Invite Member
                </button>
              </div>

              {/* Team Members */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Team Members (4)</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { name: 'Vishal D', role: 'Owner', initials: 'VD', color: 'from-pink-400 to-rose-500', status: 'online', email: 'vishal@auraflow.io' },
                    { name: 'Alex Kim', role: 'Editor', initials: 'AK', color: 'from-blue-400 to-indigo-500', status: 'online', email: 'alex@auraflow.io' },
                    { name: 'Jordan Smith', role: 'Reviewer', initials: 'JS', color: 'from-green-400 to-emerald-500', status: 'offline', email: 'jordan@auraflow.io' },
                    { name: 'Sam Lee', role: 'Viewer', initials: 'SL', color: 'from-orange-400 to-amber-500', status: 'away', email: 'sam@auraflow.io' },
                  ].map((member, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xs font-bold`}>
                            {member.initials}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-yellow-500' : 'bg-slate-300'}`}></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{member.name}</p>
                          <p className="text-xs text-slate-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${member.role === 'Owner' ? 'bg-indigo-100 text-indigo-600' : member.role === 'Editor' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                          {member.role}
                        </span>
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                          <Settings size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Activity</h3>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { user: 'VD', action: 'updated the timeline', time: '2 min ago', color: 'from-pink-400 to-rose-500' },
                    { user: 'AK', action: 'added Spanish dubbing track', time: '15 min ago', color: 'from-blue-400 to-indigo-500' },
                    { user: 'JS', action: 'left a comment on Scene 3', time: '1 hour ago', color: 'from-green-400 to-emerald-500' },
                    { user: 'VD', action: 'exported preview video', time: '3 hours ago', color: 'from-pink-400 to-rose-500' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {activity.user}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">{activity.user}</span> {activity.action}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Comments (3)</h3>
                  <button className="text-indigo-600 text-xs font-bold">View All</button>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">VD</div>
                    <div className="flex-1">
                      <input type="text" placeholder="Add a comment..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="h-8 bg-white border-t border-slate-200 px-6 flex justify-between items-center text-[9px] font-black text-slate-400 tracking-widest uppercase">
           <div className="flex gap-6">
             <span>Renderer: GPU-Accel</span>
             <span>Cache: 1.2GB Free</span>
           </div>
           <div>AuraFlow Studio v4.0.2-Stable</div>
        </footer>
      </div>

      {/* 4. RIGHT COLLAPSIBLE STUDIO CONTROLS */}
      <aside 
        className={`bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${rightBarOpen ? 'w-80' : 'w-0 overflow-hidden'}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-slate-50">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">Studio Controls</h2>
          <button onClick={() => setRightBarOpen(false)} className="text-slate-300 hover:text-slate-900"><ChevronRightIcon size={18}/></button>
        </div>

        <div className="p-8 space-y-10 overflow-y-auto flex-1">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Dubbing</h3>
              <div className="flex gap-1">
                <button className="w-5 h-5 flex items-center justify-center bg-indigo-50 rounded text-indigo-600"><Plus size={12}/></button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <DubCard lang="ES" title="Spanish" active={activeLang === 'ES'} onClick={() => setActiveLang('ES')} />
              <DubCard lang="JP" title="Japanese" active={activeLang === 'JP'} onClick={() => setActiveLang('JP')} />
              <DubCard lang="DE" title="German" active={activeLang === 'DE'} onClick={() => setActiveLang('DE')} />
              <DubCard lang="EN" title="English" active={activeLang === 'EN'} onClick={() => setActiveLang('EN')} />
            </div>
          </section>

          <section className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-4 shadow-sm">
             <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Speaker Model</h3>
                <Sparkles size={14} className="text-indigo-400" />
             </div>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                 <User size={24} />
               </div>
               <div>
                 <p className="text-xs font-black text-slate-900">Original Voice</p>
                 <p className="text-[10px] text-slate-500 font-bold italic">Neural Clone 98%</p>
               </div>
             </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100">
           <button className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3">
             Render Sequence <ChevronRightIcon size={14} />
           </button>
        </div>
      </aside>

      {/* Toggle to reopen Right Bar */}
      {!rightBarOpen && (
        <button 
          onClick={() => setRightBarOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-white border border-slate-200 p-2 rounded-l-xl shadow-xl z-[60]"
        >
          <ChevronLeft size={20} className="text-indigo-600" />
        </button>
      )}
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const SideIcon = ({ icon, active, onClick }) => (
  <button onClick={onClick} className={`p-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-600'}`}>
    {icon}
  </button>
);

const ToolCard = ({ title, desc, active, onClick, icon }) => (
  <button onClick={onClick} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all text-left ${active ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600' : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'}`}>
    <div className={`p-2 rounded-lg ${active ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>{icon}</div>
    <div>
      <p className="text-[11px] font-black uppercase tracking-tight text-slate-900">{title}</p>
      <p className="text-[10px] text-slate-400 font-bold">{desc}</p>
    </div>
  </button>
);

const FilterBox = ({ label, filter, active, set, img }) => (
  <div onClick={() => set(filter)} className={`cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all ${active ? 'border-indigo-600 scale-95' : 'border-transparent'}`}>
    <img src={img} className="w-full h-16 object-cover opacity-80" style={{ filter }} />
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
      <span className="text-[9px] font-black text-white uppercase tracking-widest">{label}</span>
    </div>
  </div>
);

const MagicItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-100/50 text-indigo-600'}`}>
    {icon}
    <span className="text-[11px] font-bold">{label}</span>
  </div>
);

const TimelineTrack = ({ icon, label, color, border, width, isAudio }) => (
  <div className="flex gap-4 items-center group h-12">
    <div className="w-24 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
      {icon} {label}
    </div>
    <div className="flex-1 bg-slate-50 rounded-2xl h-10 border border-slate-100 relative group-hover:bg-slate-100 transition-colors overflow-hidden">
       <div className={`absolute top-1 bottom-1 left-1 ${color} ${border} border rounded-xl`} style={{ width }}>
          {isAudio && (
            <div className="flex items-center gap-0.5 h-full px-4 overflow-hidden opacity-30">
              {[...Array(60)].map((_, i) => (
                <div key={i} className="w-1 bg-indigo-500 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
              ))}
            </div>
          )}
       </div>
    </div>
  </div>
);

const DubCard = ({ lang, title, active, onClick }) => (
  <div onClick={onClick} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${active ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
    <div className="flex justify-between items-center mb-1">
      <span className={`text-[10px] font-black ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{lang}</span>
      {active && <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>}
    </div>
    <p className="text-xs font-black text-slate-900 uppercase">{title}</p>
    <p className="text-[10px] text-slate-500 font-bold mt-1">Ready for Sync</p>
  </div>
);

export default AuraFlowStudioPro;