const LoadingOverlay = ({ isLoading, label = 'Loading...', children, className = '' }) => (
  <div className={`relative ${className}`} aria-busy={isLoading}>
    {children && (
      <div
        className={`transition-[filter] duration-200 ${isLoading ? 'pointer-events-none select-none blur-sm' : ''}`}
        aria-hidden={isLoading}
      >
        {children}
      </div>
    )}
    {isLoading && (
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm' role='status' aria-live='polite'>
        <span className='sr-only'>{label}</span>
        <span
          className='h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600'
          aria-hidden='true'
        />
      </div>
    )}
  </div>
)

export default LoadingOverlay
