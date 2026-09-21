
// Production requests use Vercel's same-origin proxy so auth cookies stay first-party.
const API_URL = import.meta.env.PROD
	? ''
	: (import.meta.env.VITE_API_URL || 'http://localhost:3000')

export default API_URL
