import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Code2, PlusCircle, LayoutDashboard, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Gallery', icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-display text-2xl text-gradient tracking-wider">UIVault</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === l.to
                    ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                    : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                  }`}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
            
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-card/95 backdrop-blur-xl px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-brand-muted hover:text-brand-text hover:bg-white/5 transition"
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          
        </div>
      )}
    </nav>
  );
}