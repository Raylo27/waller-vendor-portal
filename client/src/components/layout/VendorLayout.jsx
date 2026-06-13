import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function VendorLayout({ children }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <h1 className="text-xl font-bold">City of Waller, Texas</h1>
            <p className="text-blue-200 text-sm">Vendor Portal</p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/opportunities')}
              className="text-blue-200 hover:text-white text-sm"
            >
              Opportunities
            </button>
            {user && user.type === 'vendor' ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-200 hover:text-white text-sm"
                >
                  My Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded text-white border border-blue-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-200 hover:text-white text-sm"
                >
                  Vendor Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="text-sm bg-white text-blue-900 hover:bg-blue-50 px-4 py-2 rounded font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-8 px-8 text-center text-sm">
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

export default VendorLayout