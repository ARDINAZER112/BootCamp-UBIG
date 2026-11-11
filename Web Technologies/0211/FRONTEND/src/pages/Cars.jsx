import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../api/api'

export default function Cars() {
    const [cars, setCars] = useState([])
    const [appliedIds, setAppliedIds] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        const load = async () => {
            try {
                const [c, a] = await Promise.all([
                    api.get('/instalment_cars'),
                    api.get('/applications'),
                ])
                if (!active) return
                setCars(c.data.cars ?? [])
                const ids = (a.data.instalments ?? [])
                    .filter((i) => i.applications?.length > 0)
                    .map((i) => i.id)
                setAppliedIds(new Set(ids))
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

    return (
        <Layout title="Cars">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="section-header mb-4">
                <h4 className="section-title text-muted font-weight-normal">List of Cars</h4>
            </div>

            {loading ? (
                <p className="text-muted">Loading...</p>
            ) : (
                <div className="section-body">
                    {cars.map((car) => {
                        const applied = appliedIds.has(car.id)
                        return (
                            <article className={`spot ${applied ? 'unavailable' : ''}`} key={car.id}>
                                <div className="row">
                                    <div className="col-5">
                                        <h5 className="text-primary">{car.car.trim()}</h5>
                                        <span className="text-muted">{car.description.trim()}</span>
                                    </div>
                                    <div className="col-4">
                                        <h5>Available Month</h5>
                                        <span className="text-muted">
                                            {car.available_month.map((m) => m.description).join(', ')}
                                        </span>
                                    </div>
                                    <div className="col-3">
                                        {applied ? (
                                            <div className="bg-success text-white p-2">
                                                Vacancies have been submitted
                                            </div>
                                        ) : (
                                            <Link
                                                to={`/cars/${car.id}`}
                                                className="btn btn-danger btn-lg btn-block"
                                            >
                                                Detail
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </Layout>
    )
}