import React, { useState } from "react";
import UserUrl from "../components/UserUrl.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice.js";
import { logoutUser } from "../api/user.api.js";
import { useNavigate } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate({ to: "/" });
    }
  };

  const firstName = user?.name?.trim() ? user.name.trim().split(/\s+/)[0] : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── top bar ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 h-16">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Shortyfy
            </span>
          </Link>

          {/* user menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2.5 rounded-xl hover:bg-gray-50 px-3 py-1.5 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-violet-500/20">
                {firstName ? firstName.charAt(0).toUpperCase() : ""}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {firstName}
              </span>
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-52 z-50 rounded-xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 py-1.5 animate-fadeIn">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {firstName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── main content ── */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back{firstName ? `, ${firstName}` : ""}{" "}
            <span className="inline-block animate-wave origin-[70%_70%]">
              👋
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your links today.
          </p>
        </div>

        {/* stat cards — values filled dynamically by UserUrl via context, but shown as placeholders driven by data */}
        <UserUrl />
      </main>

      {/* animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%   { transform: rotate(0deg); }
          10%  { transform: rotate(14deg); }
          20%  { transform: rotate(-8deg); }
          30%  { transform: rotate(14deg); }
          40%  { transform: rotate(-4deg); }
          50%  { transform: rotate(10deg); }
          60%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-wave   { animation: wave 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default DashboardPage;
