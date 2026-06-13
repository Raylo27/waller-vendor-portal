import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import API_URL from '../../config/api'

function VendorLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/auth/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError('Invalid email or EIN. Please try again.')
        setLoading(false)
        return
      }

      login({ ...data.vendor, type: 'vendor' }, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Unable to connect to server.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">City of Waller, Texas</h1>
            <p className="text-blue-200 text-sm">Vendor Portal</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vendor Login
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Sign in with your registered email and EIN
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="business@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EIN / Tax ID
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="XX-XXXXXXX"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Not registered yet?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:underline"
              >
                Register your business
              </button>
            </p>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Use your business email and EIN to sign in
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-6 text-center text-sm">
        <p>City of Waller, Texas — Vendor Portal</p>
      </div>
    </div>
  )
}

export default VendorLogin