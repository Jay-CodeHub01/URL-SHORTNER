import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api.js'

const ROWS_PER_PAGE = 5

const UserUrl = () => {
  const publicBaseUrl = import.meta.env.VITE_APP_URL || import.meta.env.VITE_API_URL || window.location.origin
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // ── derived data ──
  const allUrls = useMemo(() => {
    if (!urls?.urls) return []
    return [...urls.urls].reverse()
  }, [urls])

  const filtered = useMemo(() => {
    if (!search.trim()) return allUrls
    const q = search.toLowerCase()
    return allUrls.filter(
      (u) =>
        u.full_url.toLowerCase().includes(q) ||
        u.short_url.toLowerCase().includes(q)
    )
  }, [allUrls, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  // ── stats ──
  const stats = useMemo(() => {
    const total = allUrls.length
    const totalClicks = allUrls.reduce((s, u) => s + (u.clicks || 0), 0)
    const avg = total > 0 ? Math.round(totalClicks / total) : 0

    // clicks from urls created "today"
    const todayStr = new Date().toISOString().slice(0, 10)
    const todayClicks = allUrls
      .filter((u) => u.createdAt?.slice(0, 10) === todayStr)
      .reduce((s, u) => s + (u.clicks || 0), 0)

    return { total, totalClicks, todayClicks, avg }
  }, [allUrls])

  const formatNum = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return n.toString()
  }

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // ── pagination helpers ──
  const getPages = () => {
    const pages = []
    const max = 5
    let start = Math.max(1, currentPage - Math.floor(max / 2))
    let end = start + max - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - max + 1)
    }
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  // ── loading state ──
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* skeleton stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 animate-pulse">
              <div className="h-3 w-20 rounded bg-gray-200 mb-3" />
              <div className="h-8 w-16 rounded bg-gray-200 mb-2" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
          ))}
        </div>
        {/* skeleton table */}
        <div className="rounded-2xl bg-white border border-gray-100 p-6 animate-pulse">
          <div className="h-5 w-28 rounded bg-gray-200 mb-6" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="h-4 flex-2 rounded bg-gray-100" />
              <div className="h-4 flex-1 rounded bg-gray-100" />
              <div className="h-4 w-14 rounded bg-gray-100" />
              <div className="h-4 w-24 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── error state ──
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 flex items-start gap-3">
        <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-red-700">Error loading your URLs</p>
          <p className="text-sm text-red-600 mt-0.5">{error.message}</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Links',
      value: formatNum(stats.total),
      trend: `+${stats.total} total`,
      color: 'violet',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5" />
        </svg>
      ),
    },
    {
      label: 'Total Clicks',
      value: formatNum(stats.totalClicks),
      trend: `${formatNum(stats.totalClicks)} all time`,
      color: 'purple',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
      ),
    },
    {
      label: 'Clicks Today',
      value: formatNum(stats.todayClicks),
      trend: `${stats.todayClicks} today`,
      color: 'emerald',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: 'Avg. Clicks/Link',
      value: formatNum(stats.avg),
      trend: `~${stats.avg} per link`,
      color: 'amber',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  const colorMap = {
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', trend: 'text-violet-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', trend: 'text-purple-500' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', trend: 'text-emerald-500' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', trend: 'text-amber-500' },
  }

  return (
    <div className="space-y-6">
      {/* ══════════ STAT CARDS ══════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const c = colorMap[card.color]
          return (
            <div
              key={card.label}
              className="group rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{card.label}</span>
                <div className={`h-9 w-9 rounded-xl ${c.bg} ${c.text} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{card.value}</p>
              <p className={`text-xs font-medium mt-1.5 ${c.trend}`}>
                {card.trend}
              </p>
            </div>
          )
        })}
      </div>

      {/* ══════════ LINKS TABLE ══════════ */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Your Links</h2>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* search */}
            <div className="relative flex-1 sm:flex-initial">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                placeholder="Search links..."
                className="w-full sm:w-52 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5" />
              </svg>
            </div>
            <p className="text-base font-semibold text-gray-900 mb-1">No links found</p>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              {search ? 'Try a different search term.' : "You haven't created any shortened URLs yet. Go to the home page to create one!"}
            </p>
          </div>
        ) : (
          <>
            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Original URL</th>
                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Short URL</th>
                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.map((url) => (
                    <tr key={url._id} className="group hover:bg-violet-50/40 transition-colors duration-150">
                      {/* original url */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 truncate max-w-55" title={url.full_url}>
                          {url.full_url}
                        </p>
                      </td>
                      {/* short url */}
                      <td className="px-6 py-4">
                        <a
                          href={`${publicBaseUrl.replace(/\/$/, '')}/${url.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                        >
                          short.ly/{url.short_url}
                        </a>
                      </td>
                      {/* clicks */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold">
                          {url.clicks.toLocaleString()}
                        </span>
                      </td>
                      {/* created at */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{formatDate(url.createdAt)}</span>
                      </td>
                      {/* actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(`${publicBaseUrl.replace(/\/$/, '')}/${url.short_url}`, url._id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                              copiedId === url._id
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700'
                            }`}
                          >
                            {copiedId === url._id ? (
                              <>
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </>
                            )}
                          </button>
                          <a
                            href={`${publicBaseUrl.replace(/\/$/, '')}/${url.short_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-violet-100 hover:text-violet-700 transition-all duration-200"
                            title="Open link"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-500">
                Showing {(currentPage - 1) * ROWS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of{' '}
                {filtered.length} results
              </p>
              <div className="flex items-center gap-1">
                {/* prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* page numbers */}
                {getPages().map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      p === currentPage
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                        : 'text-gray-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {/* next */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserUrl