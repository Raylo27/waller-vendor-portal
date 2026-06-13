import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config/api'

const CATEGORIES = [
  'Construction and Infrastructure',
  'Landscaping and Grounds Maintenance',
  'Information Technology and Networking',
  'Janitorial and Cleaning Services',
  'Professional and Financial Services',
  'Office Supplies and Furniture',
  'Vehicles and Equipment',
  'Printing and Signage',
  'Utilities and Environmental Services',
  'Food and Catering Services',
]

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    ein: '',
    categories: [],
    documentNames: [],
  })
  const [fileName, setFileName] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleCategory = (cat) => {
    if (form.categories.includes(cat)) {
      setForm({ ...form, categories: form.categories.filter(c => c !== cat) })
    } else {
      setForm({ ...form, categories: [...form.categories, cat] })
    }
  }

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name)
      setForm({ ...form, documentNames: [e.target.files[0].name] })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.categories.length === 0) {
      setError('Please select at least one service category.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      navigate('/register/confirm', { state: { vendor: data.vendor } })
    } catch (err) {
      setError('Unable to connect to server. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
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

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Register as a Vendor
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Complete this form to register your business with the
          City of Waller vendor portal.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Business Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Your business name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name *
              </label>
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Primary contact"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type *
              </label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select type</option>
                <option>LLC</option>
                <option>Corporation</option>
                <option>Sole Proprietor</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="business@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="(936) 555-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Address *
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="123 Main St, Waller, TX 77484"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EIN / Tax ID *
            </label>
            <input
              name="ein"
              value={form.ein}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="XX-XXXXXXX"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Categories * (select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <label
                  key={cat}
                  className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-sm transition-all ${
                    form.categories.includes(cat)
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-blue-700"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* W-9 Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload W-9 *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center">
              <input
                type="file"
                onChange={handleFile}
                className="hidden"
                id="w9upload"
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="w9upload"
                className="cursor-pointer text-blue-600 hover:underline text-sm"
              >
                Click to upload W-9
              </label>
              {fileName && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ {fileName}
                </p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                PDF, DOC, or DOCX
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              id="terms"
              className="mt-1 accent-blue-700"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I certify that the information provided is accurate and
              I am authorized to register this business with the
              City of Waller vendor portal.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-8 px-6 text-center text-sm mt-10">
        <p>City of Waller, Texas — Vendor Portal</p>
        <p className="mt-1">
          Questions? Contact{' '}
          <span className="text-blue-400">lspencer@wallertexas.gov</span>
          {' '}| (936) 931-5151
        </p>
      </div>
    </div>
  )
}

export default Register