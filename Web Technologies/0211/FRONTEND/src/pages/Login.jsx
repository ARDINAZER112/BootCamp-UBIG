import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const [idCard, setIdCard] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (user) return <Navigate to="/dashboard" replace />

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(idCard, password)
            navigate('/dashboard', { replace: true })
        } catch (err) {
            setError(
                err.response
                    ? 'ID Card Number or Password incorrect'
                    : 'Cannot connect to server'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout title="Installment Cars" center>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {state?.message && (
                        <div className="alert alert-success">{state.message}</div>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className="card card-default" onSubmit={handleSubmit}>
                        <div className="card-header">
                            <h4 className="mb-0">Login</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group row align-items-center">
                                <div className="col-4 right">ID Card Number</div>
                                <div className="col-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={idCard} onChange={(e) => setIdCard(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-4 text-right">Password</div>
                                <div className="col-8">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group row align-item-center mt-4">
                                    <div className="col-4">
                                        <div className="col-8">
                                            <button className="btn btn-primary" disabled={loading}>
                                                {loading ? 'Loading...' : 'Login'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}