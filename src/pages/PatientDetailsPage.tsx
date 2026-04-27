import { useMemo } from 'react'
import { PatientGrid } from '../components/patients/PatientGrid'
import { PatientList } from '../components/patients/PatientList'
import { usePatientStore } from '../stores/usePatientStore'

export const PatientDetailsPage = () => {
  const { patients, viewMode, setViewMode } = usePatientStore()

  const sortedPatients = useMemo(
    () => [...patients].sort((a, b) => b.riskScore - a.riskScore),
    [patients],
  )

  return (
    <section>
      <div className="page-head">
        <h2>Patient Details</h2>
        <div className="view-toggle">
          <button
            type="button"
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            Grid View
          </button>
          <button
            type="button"
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            List View
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <PatientGrid patients={sortedPatients} />
      ) : (
        <PatientList patients={sortedPatients} />
      )}
    </section>
  )
}
