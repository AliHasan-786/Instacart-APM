import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import PortfolioPage from './pages/PortfolioPage'
import BrowsePage from './pages/BrowsePage'
import ProductPage from './pages/ProductPage'
import SettingsPage from './pages/SettingsPage'
import EquiBatchPage from './pages/EquiBatchPage'
import CaperContextPage from './pages/CaperContextPage'
import PRDPage from './pages/PRDPage'

export default function App() {
    const location = useLocation()
    const isInstaTrust = location.pathname.startsWith('/instatrust')

    return (
        <>
            {isInstaTrust && <Header />}
            <Routes>
                {/* Portfolio Landing */}
                <Route path="/" element={<PortfolioPage />} />

                {/* InstaTrust (nested) */}
                <Route path="/instatrust" element={<BrowsePage />} />
                <Route path="/instatrust/product/:id" element={<ProductPage />} />
                <Route path="/instatrust/settings" element={<SettingsPage />} />

                {/* EquiBatch */}
                <Route path="/equibatch" element={<EquiBatchPage />} />

                {/* Caper Context */}
                <Route path="/caper" element={<CaperContextPage />} />

                {/* PRD Documentation */}
                <Route path="/prd/:id" element={<PRDPage />} />
            </Routes>
        </>
    )
}
