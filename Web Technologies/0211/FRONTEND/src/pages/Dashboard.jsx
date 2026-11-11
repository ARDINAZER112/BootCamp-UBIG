import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import StatusBadge from '../components/StatusBadge'
import api from '../api/api'
import { rupiah } from '../utils/format'
import { Link, useLocation } from 'react-router-dom'

export default function Dashboard() {
    const [validation, setValidation] = useState(null)
    const [instalments, setInstalments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { state } = useLocation()

    useEffect(() => {
        let active = true
        const load = async () => {
            try {
                const [v, a] = await Promise.all([
                    api.get('/validations').catch((err) =>
                        err.response?.status === 404 ? { data: {} } : Promise.reject(err)
                    ),
                    api.get('/applications'),
                ])
                if (!active) return
                setValidation(v.data.validation ?? null)
                setInstalments(a.data.instalments ?? [])
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
    }, [])

    const cards = instalments.flatMap((car) =>
        (car.applications ?? []).map((app) => ({ car, app }))
    )
    const accepted = validation?.status === 'accepted'

    return (
        <Layout title="Dashboard">
            {state?.message && (
                <div className={`alert alert-${state.type ?? 'success'}`}>{state.message}</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <p className="text-muted">Loading...</p>
            ) : (
                <>
                    {/* ===== Data validation ===== */}
                    <section className="mb-5">
                        <h4 className="section-title text-muted mb-3">My Data validation</h4>
                        <div className="row">
                            {!validation ? (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header"><h5 className="mb-0">Data Validation</h5></div>
                                        <div className="card-body">
                                            <Link to="/validation/create" className="btn btn-primary btn-block">
                                                + Request validation
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header border-0"><h5 className="mb-0">Data Validation</h5></div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr><th>Status</th><td><StatusBadge status={validation.status} /></td></tr>
                                                    <tr><th>Job</th><td className="text-muted">{validation.job ?? '-'}</td></tr>
                                                    <tr>
                                                        <th>Income/Month</th>
                                                        <td className="text-muted">
                                                            {validation.income != null ? rupiah(validation.income) : '-'}
                                                        </td>
                                                    </tr>
                                                    <tr><th>Validator</th><td className="text-muted">{validation.validator?.name ?? '-'}</td></tr>
                                                    <tr><th>Validator Notes</th><td className="text-muted">{validation.validator_notes ?? '-'}</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* ===== Instalment applications ===== */}
                    <section className="mb-5">
                        <div className="row mb-3">
                            <div className="col-md-8">
                                <h4 className="section-title text-muted">Instalment Applications</h4>
                            </div>
                            {accepted && (
                                <div className="col-md-4">
                                    <Link to="/cars" className="btn btn-primary btn-lg btn-block">
                                        + Add Installment Cars
                                    </Link>
                                </div>
                            )}
                        </div>

                        {!accepted ? (
                            <div className="alert alert-warning">
                                Your data validation must be approved by validator to get the applying instalment
                            </div>
                        ) : cards.length === 0 ? (
                            <p className="text-muted">No applications yet.</p>
                        ) : (
                            <div className="row mb-4">
                                {cards.map(({ car, app }) => (
                                    <div className="col-md-6 mb-4" key={`${car.id}-${app.month}`}>
                                        <div className="card card-default">
                                            <div className="card-header border-0">
                                                <h5 className="mb-0">{car.car.trim()}</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-striped mb-0">
                                                    <tbody>
                                                        <tr><th>Description</th><td className="text-muted">{car.description.trim()}</td></tr>
                                                        <tr><th>Price</th><td className="text-muted">{rupiah(car.price)}</td></tr>
                                                        <tr>
                                                            <th>Installment</th>
                                                            <td className="text-muted">
                                                                {app.month} Months <StatusBadge status={app.apply_status} />
                                                            </td>
                                                        </tr>
                                                        <tr><th>Apply Date</th><td className="text-muted">{app.apply_date ?? '-'}</td></tr>
                                                        <tr><th>Notes</th><td className="text-muted">{app.notes}</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </Layout>
    )
}