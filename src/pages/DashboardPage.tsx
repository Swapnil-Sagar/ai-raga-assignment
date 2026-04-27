import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { FiUsers, FiAlertTriangle, FiClock, FiBell } from 'react-icons/fi'
import { Card } from '../components/common/Card'
import { useNotification } from '../hooks/useNotification'
import { usePatientStore } from '../stores/usePatientStore'

export const DashboardPage = () => {
  const { sendNotification } = useNotification()
  const patients = usePatientStore((state) => state.patients)

  const kpiCards: { title: string; value: string; delta: string; icon: ReactNode }[] = useMemo(() => {
    const criticalCases = patients.filter(
      (patient) => patient.status === 'critical',
    ).length

    return [
      { title: 'Active Patients', value: String(patients.length), delta: '+3.1%', icon: <FiUsers size={22} /> },
      { title: 'Critical Cases', value: String(criticalCases), delta: '-1.5%', icon: <FiAlertTriangle size={22} /> },
      { title: 'Avg. Response Time', value: '4m 10s', delta: '-11%', icon: <FiClock size={22} /> },
    ]
  }, [patients])

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
          <FiBell style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          Trigger Reminder
        </button>
      </div>
      <div className="kpi-grid">
        {kpiCards.map((item) => (
          <Card key={item.title} title={item.title} subtitle={`Trend ${item.delta}`}>
            <div className="kpi-row">
              <span className="kpi-icon">{item.icon}</span>
              <p className="kpi-value">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
