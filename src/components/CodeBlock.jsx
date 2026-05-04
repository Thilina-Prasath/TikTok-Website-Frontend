import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langMap = {
    html: 'markup',
    css: 'css',
    js: 'javascript',
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-brand-border">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e] border-b border-brand-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="copy-btn flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-brand-border hover:bg-white-600/20 text-brand-muted hover:text-violet-400 border border-transparent hover:border-violet-500/30 transition-all duration-200"
        >
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>

      {/* Code */}
      <div className="max-h-[500px] overflow-auto">
        <SyntaxHighlighter
          language={langMap[language] || language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: '#0d0d1a',
            padding: '1.25rem',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            fontFamily: "'JetBrains Mono', monospace",
          }}
          showLineNumbers
          lineNumberStyle={{ color: '#3a3a5c', fontSize: '0.75rem', minWidth: '2.5rem' }}
        >
          {code || '// No code provided'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}