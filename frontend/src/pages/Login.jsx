import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, ShieldAlert, Sparkles, UserCheck, Building2, Shield, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="skillpulse-shell flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="fade-in-up grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_30px_60px_rgba(7,26,52,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-blue-900 p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.18),transparent_30%)]" />
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/30">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-sky-200">Career Intelligence</div>
                <div className="text-2xl font-black tracking-tight">SkillPulse</div>
              </div>
            </div>

            <div className="max-w-md">
              <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-100">
                Turn Skills Into Opportunities
              </p>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">Build the future you want.</h1>
              <p className="mt-5 text-base leading-7 text-sky-100/90">
                Discover your skill gaps, understand industry demand, and build a career path aligned with the future of work.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-black text-cyan-300">72%</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-100/70">Readiness</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-black text-cyan-300">12+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-100/70">Career Paths</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-black text-cyan-300">AI</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-100/70">Career Signals</div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-white/80 p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
                <LogIn size={24} />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to your SkillPulse workspace</p>
            </div>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Quick demo access</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('trainee@skillsync.com')}
                  className="flex items-center justify-center gap-1 rounded-xl border border-blue-200 bg-white px-2 py-2 text-[11px] font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  <UserCheck size={12} /> Trainee
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('employer@skillsync.com')}
                  className="flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-white px-2 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-50"
                >
                  <Building2 size={12} /> Employer
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('admin@skillsync.com')}
                  className="flex items-center justify-center gap-1 rounded-xl border border-violet-200 bg-white px-2 py-2 text-[11px] font-bold text-violet-700 transition hover:bg-violet-50"
                >
                  <Shield size={12} /> Admin
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                <ShieldAlert size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="skillpulse-input skillpulse-input-with-icon"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 text-slate-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="skillpulse-input skillpulse-input-with-icon-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 transition hover:text-slate-700"
                    aria-label="Show or hide password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Remember me
                </label>
                <button type="button" className="font-semibold text-blue-700 hover:text-blue-800">Forgot password?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="skillpulse-btn w-full py-3.5 text-sm disabled:opacity-60"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="font-bold text-blue-700 transition hover:text-blue-800">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
