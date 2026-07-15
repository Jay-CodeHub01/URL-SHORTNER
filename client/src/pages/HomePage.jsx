import React from 'react'
import UrlForm from '../components/UrlForm.jsx'
import Navbar from '../components/Navbar.jsx'

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <Navbar />
      {/* ── ambient gradient blobs ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full bg-gradient-to-b from-violet-200/60 via-purple-100/40 to-transparent blur-[100px]" />
      <div className="pointer-events-none absolute top-20 -left-40 h-[300px] w-[300px] rounded-full bg-blue-100/40 blur-[90px]" />
      <div className="pointer-events-none absolute top-10 -right-40 h-[300px] w-[300px] rounded-full bg-pink-100/30 blur-[90px]" />

      {/* ── decorative floating shapes ── */}
      <div className="pointer-events-none absolute top-32 left-[8%] h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-200/50 to-purple-300/30 rotate-12 blur-[1px] animate-float-slow" />
      <div className="pointer-events-none absolute top-48 right-[10%] h-12 w-12 rounded-full bg-gradient-to-br from-pink-200/40 to-fuchsia-200/30 blur-[1px] animate-float-slow-reverse" />
      <div className="pointer-events-none absolute bottom-[35%] left-[5%] h-10 w-10 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/30 blur-[1px] animate-float-slow" />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* eyebrow badge */}
          <div className="flex justify-center mb-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-200/60 px-5 py-1.5 text-xs font-medium text-violet-600 shadow-sm">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast. Secure. Reliable.
            </span>
          </div>

          {/* headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Shorten URLs.
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mt-1">
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Share Anywhere.
            </span>
          </h1>

          {/* subtitle */}
          <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Transform long links into short, powerful links.
            <br className="hidden sm:block" />
            Track clicks and grow your audience.
          </p>

          {/* ── URL form card ── */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-xl shadow-xl shadow-gray-200/40 p-2 sm:p-2.5">
              <UrlForm />
            </div>
            <p>
              <span className="text-xs text-gray-400">
                No account required. Free to use.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Lightning Fast */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-violet-50 text-violet-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Lightning Fast</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Shorten URLs in a blazing-fast speed. No waiting, instant results every time.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-purple-50 text-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Real-time Analytics</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track clicks and analyze performance in real-time with detailed insights.
              </p>
            </div>

            {/* Secure & Reliable */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-violet-200/60 transition-all duration-300">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-indigo-50 text-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Secure &amp; Reliable</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your links are safe with us. Enterprise-grade security and 99.9% uptime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── inline keyframes for floating shapes ── */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-18px) rotate(18deg); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default HomePage