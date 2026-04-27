import type { Patient } from '../../types/patient'

interface PatientListProps {
  patients: Patient[]
}

export const PatientList = ({ patients }: PatientListProps) => {
  if (!patients.length) {
    return (
      <div className="empty-state">
        <h3>No patients available</h3>
        <p>When patient records are synced, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="patient-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Doctor</th>
            <th>Risk Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.condition}</td>
              <td>{patient.assignedDoctor}</td>
              <td>{patient.riskScore}</td>
              <td>
                <span className={`status status--${patient.status}`}>{patient.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
