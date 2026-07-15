import React, { useState } from 'react';
import { registerUser } from '../api/user.api.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user))
      navigate({to:"/"})
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-12 relative overflow-hidden">
      {/* background ambient blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-violet-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-[300px] w-[300px] rounded-full bg-purple-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute top-[20%] right-[-60px] h-[250px] w-[250px] rounded-full bg-pink-100/40 blur-[90px]" />

      {/* ── centered card ── */}
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 flex flex-col lg:flex-row bg-white">

        {/* ══════════ LEFT — gradient panel ══════════ */}
        <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-[70px]" />
          <div className="pointer-events-none absolute bottom-12 left-8 h-48 w-48 rounded-full bg-purple-400/20 blur-[60px]" />

          <div className="relative z-10 flex flex-col justify-between p-10 w-full">
            {/* logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5" />
                </svg>
              </div>
              <span className="text-white font-bold text-base">Shortify</span>
            </div>

            {/* hero text */}
            <div>
              <h2 className="text-3xl font-extrabold text-white leading-tight mb-2">
                Create Your Account
              </h2>
              <p className="text-violet-200 text-sm leading-relaxed max-w-[220px]">
                Join Shortify and start shortening URLs in seconds.
              </p>
            </div>

            {/* decorative card */}
            <div className="mt-6">
              <div className="relative w-full max-w-[220px]">
                <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-xl">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="h-2 w-2 rounded-full bg-red-400/80" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                    <div className="h-2 w-2 rounded-full bg-green-400/80" />
                  </div>
                  <div className="rounded-lg bg-white/10 border border-white/10 px-2.5 py-1.5 flex items-center gap-2 mb-3">
                    <svg className="h-3 w-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div className="h-2 flex-1 rounded-full bg-white/15" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-full rounded-full bg-white/15" />
                    <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-3/5 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
                  <div className="h-5 w-5 rounded-md bg-violet-400/40 flex items-center justify-center">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                  </div>
                  <span className="text-white text-[10px] font-medium">shortify.io/r3...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT — form ══════════ */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10 lg:py-12">
          <div className="w-full max-w-sm">
            {/* mobile logo */}
            <div className="lg:hidden flex justify-center mb-7">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5" />
                </svg>
              </div>
            </div>

            {/* heading */}
            <div className="text-center mb-7">
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Already have an account?{' '}
                <span onClick={() => state(true)} className="text-violet-600 hover:text-violet-700 font-medium cursor-pointer transition-colors">
                  Login
                </span>
              </p>
            </div>

            {/* error */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* full name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200" />
              </div>

              {/* email */}
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input id="reg-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200" />
              </div>

              {/* password */}
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input id="reg-password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} required minLength={6} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* terms */}
              <div className="flex items-start gap-2.5">
                <input id="terms" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500/40 cursor-pointer accent-violet-600" />
                <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer select-none leading-snug">
                  I agree to the{' '}
                  <a href="#" className="text-violet-600 hover:text-violet-700 font-medium underline underline-offset-2 transition-colors">Terms of Service</a>{' '}and{' '}
                  <a href="#" className="text-violet-600 hover:text-violet-700 font-medium underline underline-offset-2 transition-colors">Privacy Policy</a>
                </label>
              </div>

              {/* submit */}
              <button type="submit" onClick={handleSubmit} disabled={loading} className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:from-violet-700 active:to-purple-700 text-white text-sm font-semibold py-3 px-4 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Creating...
                  </>
                ) : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;