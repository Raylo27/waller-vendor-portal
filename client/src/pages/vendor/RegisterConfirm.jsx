import { useLocation, useNavigate } from 'react-router-dom'

function RegisterConfirm() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const vendor = state?.vendor

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
          Registration Submitted
        </h2>
        <p className="text-gray-500 mb-8">
          Your business has been registered with the City of Waller
          vendor portal.
        </p>

        {vendor && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-gray-500">Vendor ID</p>
              <p className="font-mono font-bold text-blue-900 text-lg">
                {vendor.vendorId}
              </p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="text-sm font-medium text-gray-800">
                {vendor.businessName}
              </p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Status</p>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                {vendor.status}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500">Categories</p>
              <div className="text-right">
                {vendor.categories?.map(cat => (
                  <p key={cat.name} className="text-sm text-gray-700">
                    {cat.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-8">
          Save your Vendor ID for your records. You will need it
          to log in and submit proposals.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/opportunities')}
            className="bg-blue-900 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800"
          >
            Browse Opportunities
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-50"
          >
            Back to Home
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

export default RegisterConfirm