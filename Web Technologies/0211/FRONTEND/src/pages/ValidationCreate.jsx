import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../api/api'

export default function ValidationCreate() {
    const navigate = useNavigate()
    const [working, setWorking] = useState('yes')
    const [form, setForm] = useState({
        job: '',
        job_description: '',
        income: '',
        reason_accepted: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const isWorking = working === 'yes'
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await api.post('/validation', {
                job: isWorking ? form.job : null,
                job_description: isWorking ? form.job_description : null,
                income: isWorking ? form.income : null,
                reason_accepted: form.reason_accepted,
            })
            navigate('/dashboard', {
                replace: true,
                state: { message: 'Request data validation successful' },
            })
        } catch (err) {
            const errors = err.response?.data?.errors
            setError(
                errors
                    ? Object.values(errors).flat().join(' ')
                    : err.response?.data?.message ?? 'Cannot connect to server'
            )
            setLoading(false)
        }
    }

    return (
        <Layout title="Request Data Validation">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-3 mb-0">Are you working?</label>
                                <select
                                    className="form-control-sm"
                                    value={working}
                                    onChange={(e) => setWorking(e.target.value)}
                                >
                                    <option value="yes">Yes, I have</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {isWorking && (
                                <>
                                    <input
                                        type="text"
                                        name="job"
                                        placeholder="Your Job"
                                        className="form-control mt-2 mb-2"
                                        value={form.job}
                                        onChange={handleChange}
                                    />
                                    <textarea
                                        name="job_description"
                                        className="form-control"
                                        rows="5"
                                        placeholder="describe what you do in your job"
                                        value={form.job_description}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="number"
                                        name="income"
                                        placeholder="Income (Rp)"
                                        className="form-control mt-2"
                                        value={form.income}
                                        onChange={handleChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="d-flex align-items-center mb-3">
                                <label className="mr-3 mb-0">Reason Accepted</label>
                            </div>
                            <textarea
                                name="reason_accepted"
                                className="form-control"
                                rows="6"
                                placeholder="Explain why you should be accepted"
                                value={form.reason_accepted}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    disabled={loading || !form.reason_accepted.trim()}
                >
                    {loading ? 'Sending...' : 'Send Request'}
                </button>
            </form>
        </Layout>
    )
}