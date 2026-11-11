import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestConsultation } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Consultation({ user, onLogout }) {
  const [hasDisease, setHasDisease] = useState('no')
  const [diseaseHistory, setDiseaseHistory] = useState('')
  const [hasSymptoms, setHasSymptoms] = useState('no')
  const [currentSymptoms, setCurrentSymptoms] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await requestConsultation(user.token, {
        disease_history: hasDisease === 'yes' ? diseaseHistory : null,
        current_symptoms: hasSymptoms === 'yes' ? currentSymptoms : null,
      })
      alert('Request consultation successful')
      navigate('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Failed to send consultation request')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Request Consultation</h1>
          </div>
        </header>

        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="d-flex align-items-center mb-3">
                    <label htmlFor="disease-history-select" className="mr-3 mb-0">
                      Do you have disease history ?
                    </label>
                    <select
                      id="disease-history-select"
                      className="form-control-sm"
                      value={hasDisease}
                      onChange={(e) => setHasDisease(e.target.value)}
                    >
                      <option value="yes">Yes, I have</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {hasDisease === 'yes' && (
                    <textarea
                      id="disease-history"
                      className="form-control"
                      cols="30"
                      rows="6"
                      placeholder="Describe your disease history"
                      value={diseaseHistory}
                      onChange={(e) => setDiseaseHistory(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="d-flex align-items-center mb-3">
                    <label htmlFor="current-symptoms-select" className="mr-3 mb-0">
                      Do you have symptoms now ?
                    </label>
                    <select
                      id="current-symptoms-select"
                      className="form-control-sm"
                      value={hasSymptoms}
                      onChange={(e) => setHasSymptoms(e.target.value)}
                    >
                      <option value="yes">Yes, I have</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {hasSymptoms === 'yes' && (
                    <textarea
                      id="current-symptoms"
                      className="form-control"
                      cols="30"
                      rows="6"
                      placeholder="Describe your current symptoms"
                      value={currentSymptoms}
                      onChange={(e) => setCurrentSymptoms(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
