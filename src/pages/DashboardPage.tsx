import { Card } from '../components/common/Card'
import { useNotification } from '../hooks/useNotification'
import { usePatientStore } from '../stores/usePatientStore'

export const DashboardPage = () => {
  const { sendNotification } = useNotification()
  const patients = usePatientStore((state) => state.patients)

  const criticalCases = patients.filter((patient) => patient.status === 'critical').length

  const kpiCards = [
    { title: 'Active Patients', value: String(patients.length), delta: '+3.1%' },
    { title: 'Critical Cases', value: String(criticalCases), delta: '-1.5%' },
    { title: 'Avg. Response Time', value: '4m 10s', delta: '-11%' },
  ]

  const handleReminder = async () => {
    await sendNotification(
      'Appointment Reminder',
      'Patient PT-1025 has a follow-up appointment in 30 minutes.',
    )
  }

  return (
    <section>
      <div className="page-head">
        <h2>Dashboard Overview</h2>
        <button type="button" onClick={handleReminder}>
          Trigger Reminder Notification
        </button>
      </div>
      <div className="kpi-grid">
        {kpiCards.map((item) => (
          <Card key={item.title} title={item.title} subtitle={`Trend ${item.delta}`}>
            <p className="kpi-value">{item.value}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
