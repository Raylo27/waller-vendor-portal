import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import API_URL from '../../config/api'

function SubmissionsReview() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [selectedOpp, setSelectedOpp] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/opportunities`  )
      .then(res => res.json())
      .then(data => setOpportunities(data))
  }, [])

  useEffect(() => {
    const url = selectedOpp
      ? `${API_URL}/api/submissions?opportunityId=${selectedOpp}`
      : `${API_URL}/api/submissions`    

    fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSubmissions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [token, selectedOpp])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === id ? { ...s, status } : s)
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const statusColor = (status) => {
    if (status === 'Accepted') return 'bg-green-100 text-green-800'
    if (status === 'Rejected') return 'bg-red-100 text-red-800'
    if (status === 'UnderReview') return 'bg-blue-100 text-blue-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const statusLabel = (status) => {
    if (status === 'UnderReview') return 'Under Review'
    return status
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
            onClick={() => navigate('/staff/opportunities/new')}
            className="text-sm py-2 border-b-2 border-transparent hover:border-blue-300 text-blue-200 hover:text-white"
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
            className="text-sm py-2 border-b-2 border-white font-medium"
          >
            Submissions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Submissions Review
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <select
            value={selectedOpp}
            onChange={e => setSelectedOpp(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-72"
          >
            <option value="">All Opportunities</option>
            {opportunities.map(opp => (
              <option key={opp.id} value={opp.id}>
                {opp.title}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-gray-500 text-center py-12">
            Loading submissions...
          </p>
        )}

        {!loading && submissions.length === 0 && (
          <p className="text-gray-400 text-center py-12">
            No submissions found.
          </p>
        )}

        {!loading && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map(sub => (
              <div
                key={sub.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-gray-400">
                        {sub.referenceNumber}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(sub.status)}`}>
                        {statusLabel(sub.status)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {sub.vendor?.businessName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {sub.opportunity?.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {sub.notes}
                    </p>
                    {sub.documentNames && sub.documentNames.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">
                          Submitted documents:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {sub.documentNames.map((doc, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              📄 {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-3">
                      Submitted: {new Date(sub.submittedAt).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <p className="text-xs text-gray-500 font-medium">
                      Update Status
                    </p>
                    {['New', 'UnderReview', 'Accepted', 'Rejected'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(sub.id, s)}
                        className={`text-xs px-3 py-1.5 rounded border transition-all ${
                          sub.status === s
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {statusLabel(s)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-6 text-center text-sm mt-10">
        <p>City of Waller, Texas — Staff Portal</p>
      </div>
    </div>
  )
}

export default SubmissionsReview