const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://waller-portal-frontend.onrender.com'
  ]
}))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/opportunities', require('./routes/opportunities'))
app.use('/api/vendors', require('./routes/vendors'))
app.use('/api/submissions', require('./routes/submissions'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Waller Vendor Portal API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})