import React, { useState, useRef, useLayoutEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import ChannelList from './components/ChannelList';
import { CHANNELS } from './constants';
import type { Channel } from './types';

export default function App() {
  const [currentChannel, setCurrentChannel] = useState<Channel>(CHANNELS[0]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const fixedHeaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!fixedHeaderRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if(fixedHeaderRef.current) {
         setHeaderHeight(fixedHeaderRef.current.offsetHeight);
      }
    });

    resizeObserver.observe(fixedHeaderRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);


  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div ref={fixedHeaderRef} className="fixed top-0 left-0 w-full z-30 bg-black/90 backdrop-blur-sm shadow-lg shadow-black/30">
        <header className="text-center pt-4 pb-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
            SSS TV
          </h1>
          <p className="text-gray-400 text-lg mt-1">by Rana Shakir</p>
        </header>
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-4">
          <VideoPlayer src={currentChannel.url} channelName={currentChannel.name} />
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ paddingTop: `${headerHeight + 32}px` }}>
        <ChannelList channels={CHANNELS} onSelectChannel={handleChannelSelect} activeChannelName={currentChannel.name} />
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}