import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSpots } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SpotList({ user, onLogout }) {
  const [spots, setSpots] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const dose = parseInt(searchParams.get('dose') || '1', 10)

  useEffect(() => {
    fetchSpots()
  }, [])

  const fetchSpots = async () => {
    try {
      const res = await getSpots(user.token)
      setSpots(res.data.spots || [])
    } catch (err) {
      console.error('Error fetching spots:', err)
    } finally {
      setLoading(false)
    }
  }

  const getServeText = (serve) => {
    switch (serve) {
      case 1:
        return 'Only first vaccination'
      case 2:
        return 'Only second vaccination'
      case 3:
        return 'Both vaccination'
      default:
        return 'Unknown'
    }
  }

  const canServe = (spotServe, requestedDose) => {
    if (spotServe === 3) return true
    if (spotServe === 1 && requestedDose === 1) return true
    if (spotServe === 2 && requestedDose === 2) return true
    return false
  }

  const district = user.regional ? user.regional.district : 'Your Region'

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">
              {dose === 1 ? 'First Vaccination' : 'Second Vaccination'}
            </h1>
          </div>
        </header>

        <div className="container mb-5">
          <div className="section-header mb-4">
            <h4 className="section-title text-muted font-weight-normal">
              List Vaccination Spots in {district}
            </h4>
          </div>

          <div className="section-body">
            {loading ? (
              <p>Loading spots...</p>
            ) : spots.length === 0 ? (
              <p>No vaccination spots found in your region.</p>
            ) : (
              spots.map((spot) => {
                const available = canServe(spot.serve, dose)
                const vaccinesList = spot.available_vaccines
                  ? Object.entries(spot.available_vaccines)
                      .filter(([_, isAvailable]) => isAvailable)
                      .map(([name]) => name)
                      .join(', ')
                  : ''

                return (
                  <article
                    key={spot.id}
                    className={`spot ${!available ? 'unavailable' : ''}`}
                  >
                    {available ? (
                      <Link
                        to={`/spots/${spot.id}?dose=${dose}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className="row">
                          <div className="col-5">
                            <h5 className="text-primary">{spot.name}</h5>
                            <span className="text-muted">{spot.address}</span>
                          </div>
                          <div className="col-4">
                            <h5>Available vaccines</h5>
                            <span className="text-muted">
                              {vaccinesList || 'None'}.
                            </span>
                          </div>
                          <div className="col-3">
                            <h5>Serve</h5>
                            <span className="text-muted">
                              {getServeText(spot.serve)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="row">
                        <div className="col-5">
                          <h5 className="text-primary">{spot.name}</h5>
                          <span className="text-muted">{spot.address}</span>
                        </div>
                        <div className="col-4">
                          <h5>Available vaccines</h5>
                          <span className="text-muted">
                            {vaccinesList || 'None'}.
                          </span>
                        </div>
                        <div className="col-3">
                          <h5>Serve</h5>
                          <span className="text-muted">
                            {getServeText(spot.serve)}
                          </span>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
