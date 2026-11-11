import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../api/api'
import { rupiah } from '../utils/format'

export default function CarDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [income, setIncome] = useState(null)
    const [months, setMonths] = useState('')
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        const load = async () => {
            try {
                const [c, v] = await Promise.all([
                    api.get(`/instalment_cars/${id}`),
                    api.get('/validations').catch((err) =>
                        err.response?.status === 404 ? { data: {} } : Promise.reject(err)
                    ),
                ])
                if (!active) return
                setCar(c.data.instalment ?? null)
                const inc = v.data.validation?.income
                setIncome(inc != null ? Number(inc) : null)
            } catch {
                if (active) setError('Failed to load data')
            } finally {
                if (active) setLoading(false)
            }
        }
        load()
        return () => {
            active = false
        }
    }, [id])

    if (loading || !car) {
        return (
            <Layout title="Car Detail">
                {error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <p className="text-muted">{loading ? 'Loading...' : 'Car not found'}</p>
                )}
            </Layout>
        )
    }

    const selectedMonth = Number(months || car.available_month[0]?.month)
    const nominal = Math.ceil(Number(car.price) / selectedMonth)
    const canApply = income !== null && income >= nominal

    const handleApply = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            const { data } = await api.post('/applications', {
                instalment_id: car.id,
                months: selectedMonth,
                notes,
            })
            navigate('/dashboard', {
                replace: true,
                state: { message: data.message, type: 'success' },
            })
        } catch (err) {
            if (err.response) {
                navigate('/dashboard', {
                    replace: true,
                    state: {
                        message: err.response.data?.message ?? 'Failed to apply',
                        type: 'danger',
                    },
                })
            } else {
                setError('Cannot connect to server')
                setSubmitting(false)
            }
        }
    }

    return (
        <Layout title={car.car.trim()} subtitle={`Brand : ${car.brand.trim()}`} center>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleApply}>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Description</h3>
                            {car.description.trim()}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>
                                Price : <span className="badge badge-primary">{rupiah(car.price)}</span>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>Select Months</h3>
                            <select
                                className="form-control"
                                value={selectedMonth}
                                onChange={(e) => setMonths(e.target.value)}
                            >
                                {car.available_month.map((m) => (
                                    <option key={m.month} value={m.month}>
                                        {m.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <h3>
                                Nominal/Month : <span className="badge badge-primary">{rupiah(nominal)}</span>
                            </h3>
                            {!canApply && (
                                <div className="alert alert-warning mt-2">
                                    {income === null
                                        ? 'Your income data is not available.'
                                        : `Your income (${rupiah(income)}) is less than the nominal per month. Choose a longer month.`}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-3 mb-0">Notes</label>
                            </div>
                            <textarea
                                className="form-control"
                                rows="6"
                                placeholder="Explain why your installment should be approved"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <button className="btn btn-primary btn-lg" disabled={!canApply || submitting}>
                                {submitting ? 'Applying...' : 'Apply'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}