export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 overflow-hidden">
      {/* Decorative SVGs */}
      <svg
        className="absolute top-0 left-0 w-64 h-64 opacity-30 animate-spin-slow"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="80" stroke="#6366f1" strokeWidth="8" />
        <circle cx="100" cy="100" r="60" stroke="#a21caf" strokeWidth="4" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-80 h-80 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="30" y="30" width="140" height="140" rx="40" stroke="#06b6d4" strokeWidth="8" />
        <rect x="60" y="60" width="80" height="80" rx="20" stroke="#f59e42" strokeWidth="4" />
      </svg>
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-20 blur-3xl" />
      </div>
      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-6 p-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
        <div className="flex items-center gap-4">
          <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            OPTP
          </span>
        </div>
        <div className="text-xl text-gray-200 font-medium tracking-wide">
          One Policy Two Policy
        </div>

      </div>
    </div>
  );
}
