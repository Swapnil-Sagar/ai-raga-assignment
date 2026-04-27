import { Card } from '../components/common/Card'

const weeklyUtilization = [72, 81, 64, 90, 77, 84, 69]
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const AnalyticsPage = () => {
  return (
    <section>
      <div className="page-head">
        <h2>Hospital Analytics</h2>
      </div>
      <Card
        title="Weekly Bed Utilization"
        subtitle="Operational occupancy trend in percentage"
      >
        <div className="bar-chart">
          {weeklyUtilization.map((value, index) => (
            <div key={labels[index]} className="bar-chart__item">
              <div className="bar-chart__value" style={{ height: `${value}%` }} />
              <span>{labels[index]}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}
