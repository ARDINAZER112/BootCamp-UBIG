import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getConsultation, getVaccinations } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Dashboard({ user, onLogout }) {
  const [consultation, setConsultation] = useState(null)
  const [vaccinations, setVaccinations] = useState({ first: null, second: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [consRes, vacRes] = await Promise.all([
        getConsultation(user.token),
        getVaccinations(user.token),
      ])
      setConsultation(consRes.data.consultation)
      setVaccinations(vacRes.data.vaccinations || { first: null, second: null })
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const renderConsultationCard = () => {
    if (!consultation) {
      return (
        <div className="col-md-4">
          <div className="card card-default">
            <div className="card-header">
              <h5 className="mb-0">Consultation</h5>
            </div>
            <div className="card-body">
              <Link to="/consultation">+ Request consultation</Link>
            </div>
          </div>
        </div>
      )
    }

    const badgeClass =
      consultation.status === 'accepted'
        ? 'badge badge-primary'
        : consultation.status === 'rejected'
        ? 'badge badge-danger'
        : 'badge badge-info'

    const capitalize = (str) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : '-'

    return (
      <div className="col-md-4">
        <div className="card card-default">
          <div className="card-header border-0">
            <h5 className="mb-0">Consultation</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <tbody>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className={badgeClass}>{capitalize(consultation.status)}</span>
                  </td>
                </tr>
                <tr>
                  <th>Disease History</th>
                  <td className="text-muted">{consultation.disease_history || '-'}</td>
                </tr>
                <tr>
                  <th>Current Symptoms</th>
                  <td className="text-muted">{consultation.current_symptoms || '-'}</td>
                </tr>
                <tr>
                  <th>Doctor Name</th>
                  <td className="text-muted">{consultation.doctor ? consultation.doctor.name : '-'}</td>
                </tr>
                <tr>
                  <th>Doctor Notes</th>
                  <td className="text-muted">{consultation.doctor_notes || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderVaccinationCard = (title, data, isSecond = false) => {
    if (!data) {
      return (
        <div className="col-md-4">
          <div className="card card-default">
            <div className="card-header border-0">
              <h5 className="mb-0">{title}</h5>
            </div>
            <div className="card-body">
              <Link to={`/spots?dose=${isSecond ? 2 : 1}`}>+ Register vaccination</Link>
            </div>
          </div>
        </div>
      )
    }

    const isVaccinated = data.status === 'done'
    const badgeClass = isVaccinated ? 'badge badge-primary' : 'badge badge-info'
    const statusText = isVaccinated ? 'Vaccinated' : 'Registered'

    return (
      <div className="col-md-4">
        <div className="card card-default">
          <div className="card-header border-0">
            <h5 className="mb-0">{title}</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <tbody>
                <tr>
                  <th>Status</th>
                  <td className="text-muted">
                    <span className={badgeClass}>{statusText}</span>
                  </td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td className="text-muted">{data.vaccination_date}</td>
                </tr>
                <tr>
                  <th>Spot</th>
                  <td className="text-muted">{data.spot ? data.spot.name : '-'}</td>
                </tr>
                <tr>
                  <th>Vaccine</th>
                  <td className="text-muted">{data.vaccine ? data.vaccine.name : '-'}</td>
                </tr>
                <tr>
                  <th>Vaccinator</th>
                  <td className="text-muted">{data.vaccinator ? data.vaccinator.name : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const consultationAccepted = consultation && consultation.status === 'accepted'
  const firstFinished = vaccinations.first && vaccinations.first.status === 'done'

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Dashboard</h1>
          </div>
        </header>

        <div className="container">
          {/* Consultation Section */}
          <section className="consultation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Consultation</h4>
            </div>
            <div className="row">
              {loading ? <p>Loading consultation data...</p> : renderConsultationCard()}
            </div>
          </section>

          {/* List Vaccination Section */}
          <section className="consultation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Vaccinations</h4>
            </div>
            <div className="section-body">
              {!consultationAccepted ? (
                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="alert alert-warning">
                      Your consultation must be approved by doctor to get the vaccine.
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row mb-4">
                    {renderVaccinationCard('First Vaccination', vaccinations.first, false)}
                  </div>
                  {firstFinished && (
                    <div className="row">
                      {renderVaccinationCard('Second Vaccination', vaccinations.second, true)}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
