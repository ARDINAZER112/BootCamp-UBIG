import NavBar from "./NavBar";

export default function Layout({ title, subtitle, center = false, children }) {
    return (
        <>
            <NavBar />
            <main>
                <header className="jumbotron">
                    <div className={`container ${center ? 'text-center' : ''}`}>
                        <h1 className="display-4">{title}</h1>
                        {subtitle && <span className="text-muted">{subtitle}</span>}
                    </div>
                </header>
                <div className="container mb-5">{children}</div>
            </main>
            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2024 - Web Tech ID
                    </div>
                </div>
            </footer>
        </>
    )
}