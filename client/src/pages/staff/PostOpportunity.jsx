import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

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

function PostOpportunity() {
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    type: 'RFP',
    category: '',
    description: '',
    requirements: '',
    deadline: '',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    requiredDocs: [''],
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDocChange = (index, value) => {
    const updated = [...form.requiredDocs]
    updated[index] = value
    setForm({ ...form, requiredDocs: updated })
  }

  const addDoc = () => {
    setForm({ ...form, requiredDocs: [...form.requiredDocs, ''] })
  }

  const removeDoc = (index) => {
    const updated = form.requiredDocs.filter((_, i) => i !== index)
    setForm({ ...form, requiredDocs: updated })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const cleanDocs = form.requiredDocs.filter(d => d.trim() !== '')

    try {
      const res = await fetch('http://localhost:5000/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, requiredDocs: cleanDocs })
      })

      const data = await res.json()

      if (!res.ok) {
        setError('Failed to post opportunity. Please try again.')
        setLoading(false)
        return
      }

      navigate('/staff/dashboard')
    } catch (err) {
      setError('Unable to connect to server.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">City of Waller, Texas</h1>
            <p className="text-blue-200 text-sm">Staff Portal</p>
          </div>
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Nav Bar */}
      <div className="bg-blue-800 text-white px-6 py-2">
        <div className="max-w-6xl mx-auto flex gap-6">
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="text-sm py-2 border-b-2 border-transparent hover:border-blue-300 text-blue-200 hover:text-white"
          >
            Dashboard
          </button>
          <button
            className="text-sm py-2 border-b-2 border-white font-medium"
          >
            Post Opportunity
          </button>
          <button
            onClick={() => navigate('/staff/vendors')}
            className="text-sm py-2 border-b-2 border-transparent hover:border-blue-300 text-blue-200 hover:text-white"
          >
            Vendor Registry
          </button>
          <button
            onClick={() => navigate('/staff/submissions')}
            className="text-sm py-2 border-b-2 border-transparent hover:border-blue-300 text-blue-200 hover:text-white"
          >
            Submissions
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Post New Opportunity
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          This opportunity will be published immediately and visible
          to all registered vendors.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opportunity Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="e.g. Annual Lawn Maintenance Contract"
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="RFP">RFP</option>
                <option value="Bid">Bid</option>
                <option value="QuoteRequest">Quote Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Scope of Work *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Describe the work, services, or goods needed..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Requirements *
            </label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="List any qualifications, licenses, or insurance requirements..."
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Submission Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact */}
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Documents
            </label>
            <div className="space-y-2">
              {form.requiredDocs.map((doc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={doc}
                    onChange={e => handleDocChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. W-9, Certificate of Insurance, Proposal"
                  />
                  {form.requiredDocs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDoc(index)}
                      className="text-red-500 hover:text-red-700 text-sm px-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addDoc}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              + Add another document
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Opportunity'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/staff/dashboard')}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-6 text-center text-sm mt-10">
        <p>City of Waller, Texas — Staff Portal</p>
      </div>
    </div>
  )
}

export default PostOpportunity