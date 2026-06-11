import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function OpportunityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [opp, setOpp] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/api/opportunities/${id}`)
      .then(res => res.json())
      .then(data => {
        setOpp(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  )

  if (!opp) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Opportunity not found.</p>
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
            onClick={() => navigate('/opportunities')}
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Back to Opportunities
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Title block */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${typeColor(opp.type)}`}>
              {opp.type === 'QuoteRequest' ? 'Quote Request' : opp.type}
            </span>
            <span className="text-xs text-gray-500">{opp.category}</span>
            <span className="text-xs text-gray-400">ID: {opp.oppId}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {opp.title}
          </h2>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>
              <strong>Deadline:</strong>{' '}
              <span className="text-red-600 font-semibold">
                {formatDate(opp.deadline)}
              </span>
            </span>
            <span>
              <strong>Contact:</strong> {opp.contactName}
            </span>
            <span className="text-blue-600">{opp.contactEmail}</span>
          </div>
        </div>

        <hr className="mb-8" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Scope of Work
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {opp.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {opp.requirements}
          </p>
        </div>

        {/* Required Documents */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Required Documents
          </h3>
          <ul className="space-y-2">
            {opp.requiredDocs.map((doc, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <span className="w-5 h-5 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                  {index + 1}
                </span>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">
              Ready to respond to this opportunity?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Submission deadline:{' '}
              <span className="text-red-600 font-semibold">
                {formatDate(opp.deadline)}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate(`/opportunities/${opp.id}/submit`)}
            className="bg-blue-900 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800"
          >
            Submit a Proposal →
          </button>
        </div>
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

export default OpportunityDetail