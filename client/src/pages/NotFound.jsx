import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-6 text-center'>
      <p className='mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>404</p>
      <h1 className='text-3xl font-bold text-slate-800'>Page not found</h1>
      <p className='mt-3 max-w-md text-sm text-slate-600'>
        The page you were looking for does not exist or has moved.
      </p>
      <Link
        to='/home'
        className='mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
