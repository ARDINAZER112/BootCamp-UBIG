import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import Navbar from '../components/Navbar'

export default function Login({ onLogin }) {
  const [idCardNumber, setIdCardNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(idCardNumber, password)
      onLogin(res.data)
      navigate('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('ID Card Number or Password incorrect')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <header className="jumbotron">
          <div className="container text-center">
            <h1 className="display-4">Vaccination Platform</h1>
          </div>
        </header>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card card-default" onSubmit={handleSubmit}>
                <div className="card-header">
                  <h4 className="mb-0">Login</h4>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="form-group row align-items-center">
                    <div className="col-4 text-right">ID Card Number</div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={idCardNumber}
                        onChange={(e) => setIdCardNumber(e.target.value)}
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
                  </div>
                  <div className="form-group row align-items-center mt-4">
                    <div className="col-4"></div>
                    <div className="col-8">
                      <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
