import { useMemo } from 'react'
import {
  FiBarChart2,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiUsers,
  FiHeart,
} from 'react-icons/fi'
import { MdOutlineLocalHospital } from 'react-icons/md'
import { Card } from '../components/common/Card'
import { usePatientStore } from '../stores/usePatientStore'

const weeklyUtilization = [72, 81, 64, 90, 77, 84, 69]
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const monthlyAdmissions = [
  { month: 'Jan', value: 124 },
  { month: 'Feb', value: 98 },
  { month: 'Mar', value: 142 },
  { month: 'Apr', value: 117 },
  { month: 'May', value: 159 },
  { month: 'Jun', value: 136 },
]

const departmentData = [
  { name: 'Cardiology', patients: 34, color: '#ef4444' },
  { name: 'Neurology', patients: 21, color: '#8b5cf6' },
  { name: 'Orthopedics', patients: 28, color: '#3b82f6' },
  { name: 'Oncology', patients: 15, color: '#f59e0b' },
  { name: 'Pediatrics', patients: 19, color: '#10b981' },
]

const recentActivity = [
  { time: '2 min ago', event: 'Patient PT-1026 vitals updated', type: 'info' as const },
  { time: '15 min ago', event: 'Dr. Maya Shah discharged PT-1024', type: 'success' as const },
  { time: '34 min ago', event: 'Critical alert for PT-1028', type: 'warning' as const },
  { time: '1 hr ago', event: 'Lab results received for PT-1025', type: 'info' as const },
  { time: '2 hr ago', event: 'New admission: PT-1031 (Cardiology)', type: 'success' as const },
]

export const AnalyticsPage = () => {
  const patients = usePatientStore((state) => state.patients)

  const stats = useMemo(() => {
    const stable = patients.filter((p) => p.status === 'stable').length
    const recovering = patients.filter((p) => p.status === 'recovering').length
    const critical = patients.filter((p) => p.status === 'critical').length
    const avgRisk = Math.round(
      patients.reduce((sum, p) => sum + p.riskScore, 0) / patients.length,
    )
    return { stable, recovering, critical, avgRisk, total: patients.length }
  }, [patients])

  const maxAdmission = Math.max(...monthlyAdmissions.map((m) => m.value))
  const maxDeptPatients = Math.max(...departmentData.map((d) => d.patients))

  return (
    <section>
      <div className="page-head">
        <h2>
          <FiBarChart2 style={{ marginRight: '0.45rem', verticalAlign: 'middle' }} />
          Hospital Analytics
        </h2>
      </div>

      {/* KPI Summary Row */}
      <div className="analytics-kpis">
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-card__icon analytics-kpi-card__icon--blue">
            <FiUsers size={20} />
          </div>
          <div>
            <p className="analytics-kpi-card__value">{stats.total}</p>
            <p className="analytics-kpi-card__label">Total Patients</p>
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-card__icon analytics-kpi-card__icon--green">
            <FiHeart size={20} />
          </div>
          <div>
            <p className="analytics-kpi-card__value">{stats.stable}</p>
            <p className="analytics-kpi-card__label">Stable</p>
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-card__icon analytics-kpi-card__icon--amber">
            <FiActivity size={20} />
          </div>
          <div>
            <p className="analytics-kpi-card__value">{stats.recovering}</p>
            <p className="analytics-kpi-card__label">Recovering</p>
          </div>
        </div>
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-card__icon analytics-kpi-card__icon--red">
            <MdOutlineLocalHospital size={20} />
          </div>
          <div>
            <p className="analytics-kpi-card__value">{stats.critical}</p>
            <p className="analytics-kpi-card__label">Critical</p>
          </div>
        </div>
      </div>

      {/* Two-column chart row */}
      <div className="analytics-grid">
        <Card
          title="Weekly Bed Utilization"
          subtitle="Occupancy trend in percentage"
        >
          <div className="bar-chart">
            {weeklyUtilization.map((value, index) => (
              <div key={dayLabels[index]} className="bar-chart__item">
                <div className="bar-chart__value" style={{ height: `${value}%` }} />
                <span>{dayLabels[index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Monthly Admissions"
          subtitle="Patient intake over the last 6 months"
        >
          <div className="bar-chart bar-chart--teal">
            {monthlyAdmissions.map((item) => (
              <div key={item.month} className="bar-chart__item">
                <div
                  className="bar-chart__value bar-chart__value--teal"
                  style={{ height: `${(item.value / maxAdmission) * 100}%` }}
                />
                <span>{item.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Department + Activity row */}
      <div className="analytics-grid analytics-grid--bottom">
        <Card title="Department Distribution" subtitle="Active patients by department">
          <div className="dept-chart">
            {departmentData.map((dept) => (
              <div key={dept.name} className="dept-chart__row">
                <span className="dept-chart__label">{dept.name}</span>
                <div className="dept-chart__track">
                  <div
                    className="dept-chart__fill"
                    style={{
                      width: `${(dept.patients / maxDeptPatients) * 100}%`,
                      background: dept.color,
                    }}
                  />
                </div>
                <span className="dept-chart__count">{dept.patients}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Activity" subtitle="Latest hospital events">
          <ul className="activity-feed">
            {recentActivity.map((item) => (
              <li key={item.event} className={`activity-feed__item activity-feed__item--${item.type}`}>
                <span className="activity-feed__dot" />
                <div>
                  <p className="activity-feed__event">{item.event}</p>
                  <p className="activity-feed__time">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Risk Score + Trends */}
      <div className="analytics-grid">
        <Card title="Average Risk Score" subtitle="Across all active patients">
          <div className="risk-gauge">
            <div className="risk-gauge__ring">
              <svg viewBox="0 0 120 120" className="risk-gauge__svg">
                <circle cx="60" cy="60" r="52" className="risk-gauge__bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="risk-gauge__progress"
                  style={{
                    strokeDasharray: `${(stats.avgRisk / 100) * 327} 327`,
                  }}
                />
              </svg>
              <span className="risk-gauge__value">{stats.avgRisk}</span>
            </div>
            <p className="risk-gauge__label">
              {stats.avgRisk >= 70
                ? 'High risk — immediate review recommended'
                : stats.avgRisk >= 45
                  ? 'Moderate — continue monitoring'
                  : 'Low risk — stable cohort'}
            </p>
          </div>
        </Card>

        <Card title="Key Trends" subtitle="Performance indicators this week">
          <div className="trends-list">
            <div className="trends-list__item">
              <FiTrendingDown className="trends-list__icon trends-list__icon--green" />
              <div>
                <p className="trends-list__title">Avg. Wait Time</p>
                <p className="trends-list__detail">
                  Down to <strong>12 min</strong> from 18 min
                </p>
              </div>
              <span className="trends-list__badge trends-list__badge--green">-33%</span>
            </div>
            <div className="trends-list__item">
              <FiTrendingUp className="trends-list__icon trends-list__icon--blue" />
              <div>
                <p className="trends-list__title">Patient Satisfaction</p>
                <p className="trends-list__detail">
                  Increased to <strong>4.6 / 5</strong>
                </p>
              </div>
              <span className="trends-list__badge trends-list__badge--blue">+8%</span>
            </div>
            <div className="trends-list__item">
              <FiTrendingDown className="trends-list__icon trends-list__icon--green" />
              <div>
                <p className="trends-list__title">Readmission Rate</p>
                <p className="trends-list__detail">
                  Dropped to <strong>3.2%</strong>
                </p>
              </div>
              <span className="trends-list__badge trends-list__badge--green">-12%</span>
            </div>
            <div className="trends-list__item">
              <FiCalendar className="trends-list__icon trends-list__icon--amber" />
              <div>
                <p className="trends-list__title">Appointments Today</p>
                <p className="trends-list__detail">
                  <strong>47</strong> scheduled, 38 completed
                </p>
              </div>
              <span className="trends-list__badge trends-list__badge--amber">81%</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
