import type { Patient } from '../../types/patient'

interface PatientGridProps {
  patients: Patient[]
}

export const PatientGrid = ({ patients }: PatientGridProps) => {
  if (!patients.length) {
    return (
      <div className="empty-state">
        <h3>No patients available</h3>
        <p>When patient records are synced, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="patient-grid">
      {patients.map((patient) => (
        <article key={patient.id} className="patient-grid__card">
          <div className="patient-grid__top">
            <h3>{patient.name}</h3>
            <span className={`status status--${patient.status}`}>{patient.status}</span>
          </div>
          <p>{patient.condition}</p>
          <dl>
            <div>
              <dt>Patient ID</dt>
              <dd>{patient.id}</dd>
            </div>
            <div>
              <dt>Doctor</dt>
              <dd>{patient.assignedDoctor}</dd>
            </div>
            <div>
              <dt>Risk Score</dt>
              <dd>{patient.riskScore}</dd>
            </div>
            <div>
              <dt>Last Visit</dt>
              <dd>{patient.lastVisit}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  )
}
