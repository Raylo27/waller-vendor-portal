import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Opportunities() {
  const navigate = useNavigate()
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/opportunities')
      .then(res => res.json())
      .then(data => {
        setOpportunities(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filtered = opportunities.filter(opp => {
    if (categoryFilter && opp.category !== categoryFilter) return false
    if (typeFilter && opp.type !== typeFilter) return false
    return true
  })

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  }

  const typeColor = (type) => {
    if (type === 'RFP') return 'bg-blue-100 text-blue-800'
    if (type === 'Bid') return 'bg-green-100 text-green-800'
    return 'bg-yellow-100 text-yellow-800'
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

      {/* Page Title */}
      <div className="bg-gray-50 border-b py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">
            Open Opportunities
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            City of Waller — Active bids, RFPs, and quote requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b bg-white">
        <div className="max-w-5xl mx-auto flex gap-4 flex-wrap">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="">All Categories</option>
            <option>Construction and Infrastructure</option>
            <option>Landscaping and Grounds Maintenance</option>
            <option>Information Technology and Networking</option>
            <option>Janitorial and Cleaning Services</option>
            <option>Professional and Financial Services</option>
            <option>Office Supplies and Furniture</option>
            <option>Vehicles and Equipment</option>
            <option>Printing and Signage</option>
            <option>Utilities and Environmental Services</option>
            <option>Food and Catering Services</option>
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
          >
            <option value="">All Types</option>
            <option value="RFP">RFP</option>
            <option value="Bid">Bid</option>
            <option value="QuoteRequest">Quote Request</option>
          </select>

          {(categoryFilter || typeFilter) && (
            <button
              onClick={() => { setCategoryFilter(''); setTypeFilter('') }}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {loading && (
            <p className="text-gray-500 text-center py-12">
              Loading opportunities...
            </p>
          )}

          {!loading && filtered.length === 0 && (
            <p className="text-gray-500 text-center py-12">
              No opportunities found.
            </p>
          )}

          <div className="space-y-4">
            {filtered.map(opp => (
              <div
                key={opp.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${typeColor(opp.type)}`}>
                        {opp.type === 'QuoteRequest' ? 'Quote Request' : opp.type}
                      </span>
                      <span className="text-xs text-gray-500">{opp.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {opp.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="text-sm font-semibold text-red-600">
                      {formatDate(opp.deadline)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/opportunities/${opp.id}`)}
                    className="bg-blue-900 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-800"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-8 px-6 text-center text-sm">
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

export default Opportunities