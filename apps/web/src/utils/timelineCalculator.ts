import type { WeekStageId } from '../types/schema'

export interface StageScheduleInfo {
  stageId: WeekStageId
  weekLabel: string
  title: string
  offsetDays: number
  targetDate: string // YYYY-MM-DD
  targetDateFormatted: string // DD/MM/YYYY
}

export function calculateStageSchedule(enrollmentDateStr: string): Record<WeekStageId, StageScheduleInfo> {
  const baseDate = new Date(enrollmentDateStr)
  const isValid = !isNaN(baseDate.getTime())
  const validBase = isValid ? baseDate : new Date('2027-01-01')

  const addDays = (days: number): { iso: string; formatted: string } => {
    const d = new Date(validBase)
    d.setDate(d.getDate() + days)
    const iso = d.toISOString().split('T')[0]
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return { iso, formatted: `${day}/${month}/${year}` }
  }

  const stagesOffset: { id: WeekStageId; weekLabel: string; title: string; days: number }[] = [
    { id: 'W01_02', weekLabel: '2 tuần đầu', title: 'Tiếp nhận đầu vào', days: 14 },
    { id: 'W03', weekLabel: 'Tuần 3 - 8', title: 'Xử lý hồ sơ trường', days: 56 },
    { id: 'W09', weekLabel: 'Tuần 9', title: 'Nộp hồ sơ trường', days: 63 },
    { id: 'W10', weekLabel: 'Tuần 10', title: 'Phỏng vấn trường & Invoice', days: 70 },
    { id: 'W11', weekLabel: 'Tuần 11 - 13', title: 'Hồ sơ lãnh sự', days: 91 },
    { id: 'W14', weekLabel: 'Tuần 14 - 18', title: 'Nộp visa KVAC', days: 126 },
    { id: 'W19_20', weekLabel: 'Tuần 19 - 20', title: 'Xuất cảnh bàn giao', days: 140 },
  ]

  const result = {} as Record<WeekStageId, StageScheduleInfo>

  for (const s of stagesOffset) {
    const { iso, formatted } = addDays(s.days)
    result[s.id] = {
      stageId: s.id,
      weekLabel: s.weekLabel,
      title: s.title,
      offsetDays: s.days,
      targetDate: iso,
      targetDateFormatted: formatted,
    }
  }

  return result
}
