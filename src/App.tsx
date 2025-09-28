import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Skills from './pages/Skills'
import Reputation from './pages/Reputation'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import CurrentJobs from './pages/CurrentJobs'

// Setup queryClient
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/reputation" element={<Reputation />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/currentjobs" element={<CurrentJobs />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
