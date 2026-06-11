import { useLocation, useNavigate } from 'react-router-dom'

function SubmitConfirm() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const submission = state?.submission
  const oppTitle = state?.oppTitle

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-bold">City of Waller, Texas</h1>
          <p className="text-blue-200 text-sm">Vendor Portal</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-green-600 text-3xl">✓</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Proposal Submitted
        </h2>
        <p className="text-gray-500 mb-8">
          Your proposal has been received by the City of Waller.
          City staff will review your submission and contact you
          if additional information is needed.
        </p>

        {submission && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Reference Number</p>
              <p className="font-mono font-bold text-blue-900 text-lg">
                {submission.referenceNumber}
              </p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Opportunity</p>
              <p className="text-sm font-medium text-gray-800 text-right max-w-xs">
                {oppTitle}
              </p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Status</p>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                New
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="text-sm text-gray-700">
                {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-8">
          Save your reference number for your records.
          Questions? Contact{' '}
          <span className="text-blue-600">lspencer@wallertexas.gov</span>
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/opportunities')}
            className="bg-blue-900 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800"
          >
            Browse More Opportunities
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-8 px-6 text-center text-sm">
        <p>City of Waller, Texas — Vendor Portal</p>
      </div>
    </div>
  )
}

export default SubmitConfirm