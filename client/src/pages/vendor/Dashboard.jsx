import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">City of Waller, Texas</h1>
            <p className="text-blue-200 text-sm">Vendor Portal</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-blue-200 text-sm">
              {user?.businessName}
            </span>
            <button
              onClick={handleLogout}
              className="text-blue-200 hover:text-white text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome back
              </h2>
              <p className="text-gray-500 text-sm">
                Vendor ID:
                <span className="font-mono font-semibold text-blue-900 ml-2">
                  {user?.vendorId}
                </span>
              </p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {user?.status || 'Active'}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Open Opportunities</p>
            <p className="text-3xl font-bold text-blue-900">5</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">My Submissions</p>
            <p className="text-3xl font-bold text-blue-900">0</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Categories on File</p>
            <p className="text-3xl font-bold text-blue-900">
              {user?.categories?.length || 0}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/opportunities')}
            className="bg-blue-900 text-white rounded-lg p-6 text-left hover:bg-blue-800"
          >
            <p className="text-lg font-semibold mb-1">
              Browse Opportunities
            </p>
            <p className="text-blue-200 text-sm">
              View all open city bids, RFPs, and quote requests
            </p>
          </button>
          <button
            onClick={() => navigate('/opportunities')}
            className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-blue-300 hover:shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-800 mb-1">
              View My Submissions
            </p>
            <p className="text-gray-500 text-sm">
              Track the status of your submitted proposals
            </p>
          </button>
        </div>

        {/* Categories */}
        {user?.categories && user.categories.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Your Registered Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.categories.map(cat => (
                <span
                  key={cat}
                  className="bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
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

export default Dashboard