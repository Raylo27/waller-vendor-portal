import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import API_URL from '../../config/api'

function VendorRegistry() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/vendors`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setVendors(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [token])

  const filtered = vendors.filter(v =>
    v.businessName.toLowerCase().includes(search.toLowerCase()) ||
    v.contactName.toLowerCase().includes(search.toLowerCase())
  )

  const statusColor = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-800'
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-600'
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
            className="text-sm py-2 border-b-2 border-white font-medium"
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Vendor Registry
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              All registered vendors — {vendors.length} total
            </p>
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-64"
          />
        </div>

        {loading && (
          <p className="text-gray-500 text-center py-12">
            Loading vendors...
          </p>
        )}

        {!loading && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Vendor ID</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Business Name</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Contact</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Categories</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Type</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                      {vendor.vendorId}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {vendor.businessName}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      <p>{vendor.contactName}</p>
                      <p className="text-xs text-blue-600">{vendor.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.categories.map(cat => (
                          <span
                            key={cat.name}
                            className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {vendor.businessType}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(vendor.status)}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-10">
                No vendors found.
              </p>
            )}
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

export default VendorRegistry