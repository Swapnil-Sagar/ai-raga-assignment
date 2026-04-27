export type PatientStatus = 'stable' | 'critical' | 'recovering'

export interface Patient {
  id: string
  name: string
  age: number
  condition: string
  assignedDoctor: string
  lastVisit: string
  riskScore: number
  status: PatientStatus
}
