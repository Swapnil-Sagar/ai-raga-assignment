import { create } from 'zustand'
import { patients as patientSeed } from '../data/patients'
import type { Patient } from '../types/patient'

type ViewMode = 'grid' | 'list'

interface PatientState {
  patients: Patient[]
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: patientSeed,
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}))
