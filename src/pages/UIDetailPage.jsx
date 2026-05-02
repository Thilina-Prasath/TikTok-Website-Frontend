import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Eye, Calendar, Check } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { getUIById } from '../services/api';

const TABS = ['html', 'css', 'js'];

export default function UIDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ui, setUI] = useState(null);
  const [activeTab, setActiveTab] = useState('html');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shared, setShared] = useState(false);

  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    const sessionKey = `viewed_${id}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    getUIById(id, !alreadyViewed)
      .then(res => {
        setUI(res.data);
        setLoading(false);
        if (!alreadyViewed) {
          sessionStorage.setItem(sessionKey, 'true');
        }
      })
      .catch(() => { setError('UI not found.'); setLoading(false); });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const getCode = () => {
    if (!ui) return '';
    if (activeTab === 'html') return ui.htmlCode;
    if (activeTab === 'css') return ui.cssCode;
    if (activeTab === 'js') return ui.jsCode;
    return '';
  };

  const tabColors = {
    html: 'from-orange-500 to-red-500',
    css: 'from-blue-500 to-cyan-500',
    js: 'from-yellow-400 to-orange-400',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-brand-muted font-body text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">😕</p>
          <p className="text-brand-muted font-body mb-6">{error}</p>
          <button onClick={() => navigate('/')} className="text-violet-400 hover:text-violet-300 underline font-body text-sm">
            ← Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="noise min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back + Actions */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-text hover:border-violet-500/40 transition-all text-sm"
          >
            {shared ? <><Check size={14} className="text-green-400" /> Copied URL</> : <><Share2 size={14} /> Share</>}
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="font-display text-5xl sm:text-6xl text-gradient mb-3 tracking-wide">{ui.title}</h1>
          <div className="flex items-center gap-4 text-xs text-brand-muted font-body">
            <span className="flex items-center gap-1"><Eye size={12} /> {ui.views || 0} views</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(ui.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`code-tab px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 uppercase tracking-wider font-mono
                ${activeTab === tab
                  ? `bg-gradient-to-r ${tabColors[tab]} text-white border-transparent shadow-lg`
                  : 'bg-brand-card border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-muted'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code */}
        <div className="animate-fade-in" key={activeTab}>
          <CodeBlock code={getCode()} language={activeTab} />
        </div>

        {/* All 3 tabs quick view toggle note */}
        <p className="text-center text-xs text-brand-muted mt-6 font-body">
          Switch between HTML, CSS, and JS tabs to get the full component code.
        </p>
      </div>
    </div>
  );
}