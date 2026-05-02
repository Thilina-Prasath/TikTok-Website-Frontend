import React, { useEffect, useState } from 'react';
import { Users, Layers, Eye } from 'lucide-react';
import { getStats } from '../services/api';

export default function StatsBar({ totalUIs }) {
  const [visitors, setVisitors] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    getStats()
      .then(res => {
        setVisitors(res.data.totalVisitors || 0);
        setTotalViews(res.data.totalViews || 0);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { icon: <Layers size={18} />, label: 'UI Components', value: totalUIs },
    { icon: <Users size={18} />, label: 'Visitors', value: visitors.toLocaleString() },
    { icon: <Eye size={18} />, label: 'Total Views', value: totalViews.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="gradient-border bg-brand-card rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-600/15 flex items-center justify-center text-violet-400 shrink-0">
            {s.icon}
          </div>
          <div>
            <p className="text-xl font-display tracking-wide text-gradient">{s.value}</p>
            <p className="text-xs text-brand-muted font-body mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}