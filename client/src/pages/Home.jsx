import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Open roles', value: '128' },
  { label: 'Saved jobs', value: '24' },
  { label: 'Interviews', value: '7' },
]

const Home = () => {
  return (
    <div className='w-full max-w-6xl px-4 py-8'>
      <section className='rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg md:p-10'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-xl'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100'>Dashboard</p>
            <h1 className='text-3xl font-bold md:text-5xl'>Welcome back</h1>
            <p className='mt-4 text-base text-blue-50 md:text-lg'>
              Find the next role, track opportunities, and post openings faster than ever.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Link
              to='/home/search-jobs'
              className='inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50'
            >
              Find jobs
            </Link>
            <Link
              to='/home/post-jobs'
              className='inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20'
            >
              Post a job
            </Link>
          </div>
        </div>
      </section>

      <section className='mt-8 grid gap-4 md:grid-cols-3'>
        {stats.map((stat) => (
          <div key={stat.label} className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
            <p className='text-sm text-slate-500'>{stat.label}</p>
            <p className='mt-3 text-3xl font-bold text-slate-800'>{stat.value}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home