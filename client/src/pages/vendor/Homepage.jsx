import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">City of Waller, Texas</h1>
            <p className="text-blue-200 text-sm">Vendor Portal</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/opportunities')}
              className="text-blue-200 hover:text-white text-sm"
            >
              View Opportunities
            </button>
            <button
  onClick={() => navigate('/login')}
  className="text-blue-200 hover:text-white text-sm"
>
  Vendor Login
</button>
            <button
              onClick={() => navigate('/staff/login')}
              className="text-blue-200 hover:text-white text-sm"
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-blue-800 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Do Business with the City of Waller
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Register as a vendor, browse open opportunities, and submit
            proposals — all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50"
            >
              Register as a Vendor
            </button>
            <button
              onClick={() => navigate('/opportunities')}
              className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-blue-700"
            >
              View Opportunities
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Register</h4>
              <p className="text-gray-600 text-sm">
                Create your vendor profile, select your service categories,
                and upload your W-9.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Browse</h4>
              <p className="text-gray-600 text-sm">
                View all open city opportunities filtered by category,
                type, and deadline.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-900 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Submit</h4>
              <p className="text-gray-600 text-sm">
                Respond to opportunities by submitting your proposal
                and required documents digitally.
              </p>
            </div>
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

export default Homepage