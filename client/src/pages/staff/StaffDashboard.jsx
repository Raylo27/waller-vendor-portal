import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function StaffDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/staff/login')
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
          <div className="flex items-center gap-6">
            <span className="text-blue-200 text-sm">
              Welcome, {user?.name}
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

      {/* Nav Bar */}
      <div className="bg-blue-800 text-white px-6 py-2">
        <div className="max-w-6xl mx-auto flex gap-6">
          <button
            onClick={() => navigate('/staff/dashboard')}
            className="text-sm py-2 border-b-2 border-white font-medium"
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
            onClick={() => navigate('/staff/submissions')}
            className="text-sm py-2 border-b-2 border-transparent hover:border-blue-300 text-blue-200 hover:text-white"
          >
            Submissions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Portal Overview
        </h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Active Opportunities</p>
            <p className="text-3xl font-bold text-blue-900">4</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Registered Vendors</p>
            <p className="text-3xl font-bold text-blue-900">3</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Submissions This Month</p>
            <p className="text-3xl font-bold text-blue-900">5</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-red-600">2</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <button
            onClick={() => navigate('/staff/opportunities/new')}
            className="bg-blue-900 text-white rounded-lg p-6 text-left hover:bg-blue-800"
          >
            <p className="text-lg font-semibold mb-1">Post New Opportunity</p>
            <p className="text-blue-200 text-sm">
              Create and publish a new bid, RFP, or quote request
            </p>
          </button>
          <button
            onClick={() => navigate('/staff/vendors')}
            className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-blue-300 hover:shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-800 mb-1">
              View Vendor Registry
            </p>
            <p className="text-gray-500 text-sm">
              Browse and search all registered vendors
            </p>
          </button>
          <button
            onClick={() => navigate('/staff/submissions')}
            className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-blue-300 hover:shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-800 mb-1">
              Review Submissions
            </p>
            <p className="text-gray-500 text-sm">
              View and update vendor proposal submissions
            </p>
          </button>
        </div>

        {/* Recent Activity */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          {[
            { text: 'Lone Star Grounds submitted a proposal for Mowing and Grounds Maintenance', time: 'June 28, 2026', color: 'bg-blue-500' },
            { text: 'Gulf Coast Tech Solutions submitted a proposal for IT Network Equipment Procurement', time: 'July 1, 2026', color: 'bg-blue-500' },
            { text: 'Waller County Building and Repair registered as a new vendor', time: 'July 2, 2026', color: 'bg-green-500' },
            { text: 'Submission WLR-SUB-0050 marked as Accepted', time: 'June 25, 2026', color: 'bg-green-500' },
            { text: 'New opportunity posted: Annual Asphalt Road Repair and Patching Contract', time: 'June 20, 2026', color: 'bg-yellow-500' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 px-5 py-4">
              <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color}`}></span>
              <div>
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-6 text-center text-sm mt-10">
        <p>City of Waller, Texas — Staff Portal</p>
      </div>
    </div>
  )
}

export default StaffDashboard