import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { loginAdmin } from '../services/api';
import toast from 'react-hot-toast';

export default function Adminlogin() {
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await loginAdmin(form);
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminemail', res.data.email);
        toast.success(`Welcome back, ${res.data.email}!`);
        navigate('/admin'); 
      } else {
        setIsLogin(true); 
        setForm({ email: '', password: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
    setLoading(false);
  };

  return (
    <div className="noise min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25 mb-4">
            <Code2 size={32} className="text-white" />
          </div>
          <h1 className="font-display text-4xl text-gradient tracking-wide mb-2">UIVault</h1>
          <p className="text-brand-muted font-body text-sm">
            {isLogin ? 'Sign in to access the Admin Panel' : 'Create a new Admin account'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-8 gradient-border">
          
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-[#0a0a14] p-1 rounded-xl border border-brand-border">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                isLogin ? 'bg-brand-border text-brand-text' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Sign In
            </button>
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-widest mb-2 font-body">
                Email
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email"
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a14] border border-brand-border rounded-xl text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:border-violet-500/60 transition-all font-body text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-widest mb-2 font-body">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                
                <input
                  type={showPassword ? "text" : "password"} 
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-[#0a0a14] border border-brand-border rounded-xl text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:border-violet-500/60 transition-all font-body text-sm"
                />

                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all duration-200 font-body flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin && 'Sign In' }
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}