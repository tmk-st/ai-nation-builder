import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home'
import CountrySetup from './pages/CountrySetup'
import GameMain from './pages/GameMain'
import Results from './pages/Results'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<CountrySetup />} />
            <Route path="/game" element={<GameMain />} />
            <Route path="/results" element={<Results />} />
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-gray-800">
                    ページが見つかりません
                  </h2>
                  <p className="text-gray-600 mt-2">
                    <a href="/" className="text-blue-500 hover:underline">
                      ホームに戻る
                    </a>
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
