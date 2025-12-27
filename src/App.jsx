import { Routes, Route } from 'react-router-dom'
import AuraFlowLanding from './homepage.jsx'
import AurexStudio from './studio.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuraFlowLanding />} />
      <Route path="/studio" element={<AurexStudio />} />
    </Routes>
  )
}

export default App
