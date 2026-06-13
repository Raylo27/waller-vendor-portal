import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function StaffLayout({ children, currentPage }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/staff/login')
  }

  const navItems = [
    { label: 'Dashboard', path: '/staff/dashboard' },
    { label: 'Post Opportunity', path: '/staff/opportunities/new' },
    { label: 'Vendor Registry', path: '/staff/vendors' },
    { label: 'Submissions', path: '/staff/submissions' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-8">
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
              className="text-sm bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded text-white border border-blue-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <div className="bg-blue-800 px-8 border-b border-blue-700">
        <div className="max-w-6xl mx-auto flex gap-1">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-sm px-5 py-3 border-b-2 transition-all ${
                currentPage === item.label
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-blue-200 hover:text-white hover:border-blue-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {children}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-8 text-center text-sm mt-10">
        <p>City of Waller, Texas — Staff Portal</p>
      </div>
    </div>
  )
}

export default StaffLayout