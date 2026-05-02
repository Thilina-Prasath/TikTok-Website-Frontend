import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Eye, AlertCircle, CheckCircle, Code2, Users, Layers } from 'lucide-react';
import { createUI, getAllUIs, deleteUI, getStats } from '../services/api';
import toast from 'react-hot-toast';

const EMPTY = { title: '', htmlCode: '', cssCode: '', jsCode: '' };

export default function AdminPage() {
  const [form, setForm] = useState(EMPTY);
  const [uis, setUIs] = useState([]);
  const [stats, setStats] = useState({ totalVisitors: 0, totalViews: 0 });
  const [loading, setLoading] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('html');

  const loadData = () => {
    getAllUIs().then(r => setUIs(r.data)).catch(() => {});
    getStats().then(r => setStats(r.data)).catch(() => {});
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.htmlCode.trim()) { toast.error('HTML code is required'); return; }
    setLoading(true);
    try {
      await createUI(form);
      toast.success('UI component added!');
      setForm(EMPTY);
      loadData();
    } catch {
      toast.error('Failed to add UI. Check backend connection.');
    }
    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deleteUI(id);
      toast.success('Deleted');
      loadData();
    } catch {
      toast.error('Delete failed');
    }
  };

  const codeFields = {
  html: { field: 'htmlCode', label: 'HTML', color: 'from-orange-500 to-red-500', placeholder: '<!DOCTYPE html>\n<html>...</html>' },
  css: { field: 'cssCode', label: 'CSS', color: 'from-blue-500 to-cyan-500', placeholder: '* { box-sizing: border-box; }\n.container { ... }' },
  js: { field: 'jsCode', label: 'JS', color: 'from-yellow-400 to-orange-400', placeholder: '// JavaScript code here\ndocument.querySelector(...)' },
};

  return (
    <div className="noise min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <h1 className="font-display text-5xl text-gradient tracking-wide mb-2">Admin Panel</h1>
          <p className="text-brand-muted font-body text-sm">Manage your UI component library</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Layers size={20} />, label: 'Total UIs', value: uis.length, color: 'text-violet-400' },
            { icon: <Users size={20} />, label: 'Total Visitors', value: stats.totalVisitors?.toLocaleString() || 0, color: 'text-pink-400' },
            { icon: <Eye size={20} />, label: 'Total Views', value: stats.totalViews?.toLocaleString() || 0, color: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i} className="bg-brand-card border border-brand-border rounded-xl p-5 flex items-center gap-4 gradient-border">
              <div className={`${s.color} opacity-80`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-display text-gradient">{s.value}</p>
                <p className="text-xs text-brand-muted font-body">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Add Form */}
          <div className="lg:col-span-3">
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 gradient-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                  <PlusCircle size={16} className="text-white" />
                </div>
                <h2 className="font-display text-2xl text-brand-text tracking-wide">Add New UI</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase tracking-widest mb-2 font-body">
                    UI Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Glassmorphism Login Card"
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-violet-500/60 transition-all font-body text-sm"
                  />
                </div>

                {/* Code tabs */}
                <div>
                  <label className="block text-xs font-semibold text-brand-muted uppercase tracking-widest mb-2 font-body">
                    Code *
                  </label>
                  <div className="flex gap-2 mb-3">
                    {Object.entries(codeFields).map(([key, { label, color }]) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setActiveCodeTab(key)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider border transition-all duration-200
                          ${activeCodeTab === key
                            ? `bg-gradient-to-r ${color} text-white border-transparent`
                            : 'bg-brand-bg border-brand-border text-brand-muted hover:text-brand-text'
                          }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={form[codeFields[activeCodeTab].field]}
                    onChange={e => setForm({ ...form, [codeFields[activeCodeTab].field]: e.target.value })}
                    placeholder={codeFields[activeCodeTab].placeholder}
                    rows={12}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-violet-500/60 transition-all font-mono text-sm resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] disabled:opacity-50 disabled:scale-100 transition-all duration-200 font-body flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</>
                  ) : (
                    <><PlusCircle size={16} /> Add UI Component</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* UI List */}
          <div className="lg:col-span-2">
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 gradient-border">
              <div className="flex items-center gap-2 mb-5">
                <Code2 size={18} className="text-violet-400" />
                <h2 className="font-display text-2xl text-brand-text tracking-wide">Components</h2>
                <span className="ml-auto bg-violet-600/20 text-violet-400 text-xs font-mono px-2 py-0.5 rounded-full border border-violet-500/20">
                  {uis.length}
                </span>
              </div>

              {uis.length === 0 ? (
                <div className="text-center py-10 text-brand-muted text-sm font-body">
                  No UI components yet.
                </div>
              ) : (
                <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                  {uis.map(ui => (
                    <div
                      key={ui._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-muted/50 transition-all group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-brand-text truncate font-body">{ui.title}</p>
                        <p className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                          <Eye size={10} /> {ui.views || 0} views
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(ui._id, ui.title)}
                        className="shrink-0 ml-2 p-2 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}