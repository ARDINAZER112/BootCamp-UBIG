import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSpotDetail, registerVaccination } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SpotDetail({ user, onLogout }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const todayStr = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(todayStr)
  const [spotData, setSpotData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchDetail(date)
  }, [id])

  const fetchDetail = async (selectedDate) => {
    setLoading(true)
    setError('')
    try {
      const res = await getSpotDetail(user.token, id, selectedDate)
      setSpotData(res.data)
    } catch (err) {
      console.error('Error fetching spot detail:', err)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Failed to fetch spot details')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setDate(newDate)
    if (newDate) {
      fetchDetail(newDate)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!date) {
      alert('Please select a vaccination date')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await registerVaccination(user.token, {
        spot_id: parseInt(id, 10),
        date: date,
      })
      alert(res.data.message)
      navigate('/dashboard')
    } catch (err) {
      console.error('Error registering vaccination:', err)
      let errMsg = 'Failed to register vaccination'
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errMsg = err.response.data.message
        }
        if (err.response.data.errors) {
          const fieldErrors = Object.values(err.response.data.errors)
            .flat()
            .join('\n')
          errMsg += '\n' + fieldErrors
        }
      }
      alert(errMsg)
      setError(errMsg)
      navigate('/dashboard')
    } finally {
      setSubmitting(false)
    }
  }

  const renderSessionSlots = (startSlot, endSlot, bookedCount, capacity) => {
    const slots = []
    const mySlotNumber = bookedCount < capacity ? bookedCount + 1 : -1

    for (let slotNum = startSlot; slotNum <= endSlot; slotNum++) {
      let slotClass = 'slot'
      if (slotNum <= bookedCount) {
        slotClass = 'slot filled'
      } else if (slotNum === mySlotNumber) {
        slotClass = 'slot bg-primary text-white'
      }

      slots.push(
        <div key={slotNum} className="col-4 mb-4">
          <div className={slotClass}> #{slotNum} </div>
        </div>
      )
    }
    return slots
  }

  const spot = spotData ? spotData.spot : null
  const capacity = spot ? spot.capacity : 15
  const bookedCount = spotData ? spotData.vaccinations_count : 0

  const perSession = Math.ceil(capacity / 3)
  const session1End = Math.min(perSession, capacity)
  const session2End = Math.min(perSession * 2, capacity)
  const session3End = capacity

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main>
        {/* Header */}
        <header className="jumbotron">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-4">{spot ? spot.name : 'Loading...'}</h1>
              <span className="text-muted">
                {spot ? spot.address : ''}
              </span>
            </div>
            <button
              onClick={handleRegister}
              className="btn btn-primary"
              disabled={submitting || loading}
            >
              {submitting ? 'Registering...' : 'Register vaccination'}
            </button>
          </div>
        </header>

        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Date Picker */}
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="vaccination-date">Select vaccination date</label>
                <input
                  type="date"
                  className="form-control"
                  id="vaccination-date"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading spot details...</p>
          ) : (
            <div className="row mb-5">
              {/* Session 1 */}
              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h4>Session 1</h4>
                      <span className="text-muted">09:00 - 11:00</span>
                    </div>
                    <div>
                      <div className="row">
                        {renderSessionSlots(1, session1End, bookedCount, capacity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h4>Session 2</h4>
                      <span className="text-muted">13:00 - 15:00</span>
                    </div>
                    <div>
                      <div className="row">
                        {renderSessionSlots(session1End + 1, session2End, bookedCount, capacity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session 3 */}
              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h4>Session 3</h4>
                      <span className="text-muted">15:00 - 17:00</span>
                    </div>
                    <div>
                      <div className="row">
                        {renderSessionSlots(session2End + 1, session3End, bookedCount, capacity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
