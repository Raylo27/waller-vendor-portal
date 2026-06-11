import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Submit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const [opp, setOpp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileNames, setFileNames] = useState([])
  const [form, setForm] = useState({
    notes: '',
    bidAmount: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/api/opportunities/${id}`)
      .then(res => res.json())
      .then(data => setOpp(data))
  }, [id])

  const handleFile = (e, docName) => {
    if (e.target.files[0]) {
      const name = e.target.files[0].name
      setFileNames(prev => {
        const exists = prev.find(f => f.label === docName)
        if (exists) {
          return prev.map(f => f.label === docName ? { label: docName, name } : f)
        }
        return [...prev, { label: docName, name }]
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          opportunityId: id,
          notes: form.notes,
          bidAmount: form.bidAmount || null,
          documentNames: fileNames.map(f => f.name)
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError('Submission failed. Please try again.')
        setLoading(false)
        return
      }

      navigate('/submit/confirm', {
        state: {
          submission: data.submission,
          oppTitle: opp?.title
        }
      })
    } catch (err) {
      setError('Unable to connect to server.')
      setLoading(false)
    }
  }

  if (!opp) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  )

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
            onClick={() => navigate(`/opportunities/${id}`)}
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Back to Opportunity
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Submit a Proposal
        </h2>
        <p className="text-blue-700 font-medium text-sm mb-6">
          {opp.title}
        </p>

        {/* Vendor Info */}
        <div className="bg-gray-50 rounded border border-gray-200 px-4 py-3 mb-6 text-sm text-gray-600">
          Submitting as: <strong>{user?.businessName}</strong>
          <span className="ml-3 text-gray-400">ID: {user?.vendorId}</span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Proposal Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proposal Summary *
            </label>
            <textarea
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              required
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Describe your approach, qualifications, and why your business is the right fit..."
            />
          </div>

          {/* Bid Amount */}
          {opp.type === 'Bid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bid Amount (optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={form.bidAmount}
                  onChange={e => setForm({ ...form, bidAmount: e.target.value })}
                  className="w-full border border-gray-300 rounded pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}

          {/* Document Uploads */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Required Documents
            </label>
            <div className="space-y-3">
              {opp.requiredDocs.map((doc, index) => (
                <div key={index} className="border border-gray-200 rounded p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {doc}
                  </p>
                  <input
                    type="file"
                    onChange={e => handleFile(e, doc)}
                    className="hidden"
                    id={`file-${index}`}
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor={`file-${index}`}
                    className="cursor-pointer text-blue-600 hover:underline text-sm border border-blue-200 rounded px-3 py-1 inline-block"
                  >
                    Choose file
                  </label>
                  {fileNames.find(f => f.label === doc) && (
                    <span className="text-green-600 text-sm ml-3">
                      ✓ {fileNames.find(f => f.label === doc).name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              required
              id="certify"
              className="mt-1 accent-blue-700"
            />
            <label htmlFor="certify" className="text-sm text-gray-600">
              I certify that all information and documents submitted
              are accurate and complete to the best of my knowledge.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Proposal'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-8 px-6 text-center text-sm mt-10">
        <p>City of Waller, Texas — Vendor Portal</p>
      </div>
    </div>
  )
}

export default Submit