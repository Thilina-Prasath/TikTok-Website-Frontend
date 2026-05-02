import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Code2, Clock } from 'lucide-react';

export default function UICard({ ui }) {
  const navigate = useNavigate();

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  // Generate a deterministic gradient color pair from title
  const gradients = [
    ['#7c3aed', '#ec4899'],
    ['#0ea5e9', '#7c3aed'],
    ['#ec4899', '#f97316'],
    ['#10b981', '#0ea5e9'],
    ['#f59e0b', '#ec4899'],
    ['#6366f1', '#10b981'],
  ];
  const idx = ui.title.charCodeAt(0) % gradients.length;
  const [c1, c2] = gradients[idx];

  return (
    <div
      onClick={() => navigate(`/ui/${ui._id}`)}
      className="group cursor-pointer bg-brand-card border border-brand-border rounded-2xl overflow-hidden card-hover animate-fade-in"
    >
      {/* Preview banner */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${c1}22, ${c2}22)` }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <Code2 size={28} className="text-white" />
        </div>
        {/* Glow blob */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full blur-2xl opacity-40"
          style={{ background: `radial-gradient(circle, ${c1}, transparent)` }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-xs font-semibold text-white bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/20">
            View Code →
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-brand-text text-lg leading-tight mb-2 group-hover:text-gradient transition-all duration-300 font-body">
          {ui.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{ui.views || 0} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{timeAgo(ui.createdAt)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-3">
          {['HTML', 'CSS', 'JS'].map(tag => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-brand-border text-brand-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}