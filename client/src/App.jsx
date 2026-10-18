import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProfileSkills from './pages/ProfileSkills'
import Matches from './pages/Matches'
import JobDetail from './pages/JobDetail'
import SavedJobs from './pages/SavedJobs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileSkills />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:id" element={<JobDetail />} />
        <Route path="/saved" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App