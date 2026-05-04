import React, { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import UICard from '../components/UICard';
import { getAllUIs } from '../services/api';

function SkeletonCard() {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
      <div className="h-36 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 skeleton rounded-lg w-3/4" />
        <div className="h-3 skeleton rounded-lg w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 w-10 skeleton rounded-md" />
          <div className="h-5 w-10 skeleton rounded-md" />
          <div className="h-5 w-8 skeleton rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [uis, setUIs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllUIs()
      .then(res => {
        setUIs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load. Make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  const filtered = uis.filter(ui =>
    ui.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="noise min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <div className="text-center mb-12 animate-slide-up">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-3 border-white text-white text-sm font-medium mb-5">
            <Sparkles size={14} />
            TikTok Account Link :
            <a href="https://www.tiktok.com/@divdrops" target="_blank" rel="noopener noreferrer" className="underline">
              @divdrops
            </a> 
          </div>
          <h1 className="font-display text-6xl sm:text-8xl text-shadow-white mb-4 tracking-wide font-bold">
            DivDrops
          </h1>
          <p className="text-brand-muted text-lg max-w-xl mx-auto font-body">
            Beautifully crafted UI components. Copy the code, build something amazing.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search UI components..."
            className="w-full pl-11 pr-4 py-3.5 bg-brand-card border border-brand-border rounded-xl text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-violet-500/60 focus:shadow-lg focus:shadow-violet-500/10 transition-all duration-200 font-body text-sm"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-brand-muted">
            <div className="text-5xl mb-4">🎨</div>
            <p className="font-body text-lg">
              {search ? 'No results found.' : 'No UI components yet. Add one from Admin!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((ui, i) => (
              <div key={ui._id} style={{ animationDelay: `${i * 60}ms` }}>
                <UICard ui={ui} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}