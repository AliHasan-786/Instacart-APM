import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation()

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/instatrust" className="header-logo">
                    <div className="header-logo-icon">🛡️</div>
                    Insta<span>Trust</span>
                </Link>

                <div className="header-nav">
                    <Link to="/" className="header-nav-link" style={{ fontSize: '0.8rem' }}>← Portfolio</Link>
                    <Link
                        to="/instatrust"
                        className={`header-nav-link ${location.pathname === '/instatrust' ? 'active' : ''}`}
                    >
                        Browse
                    </Link>
                    <Link
                        to="/instatrust/settings"
                        className="header-settings-btn"
                        title="Settings"
                    >
                        ⚙️
                    </Link>
                </div>
            </div>
        </header>
    )
}
