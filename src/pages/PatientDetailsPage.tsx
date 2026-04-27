import { useMemo } from 'react'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { FiList } from 'react-icons/fi'
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
            <BsGrid3X3GapFill style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
            Grid
          </button>
          <button
            type="button"
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            <FiList style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
            List
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
