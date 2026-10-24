import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import DemoBadge from '../components/DemoBadge'
import type { Task, DepartmentCode, WeekStageId } from '../types/schema'
import {
  INITIAL_WORKFLOW_TASKS,
  DEPARTMENTS
} from '../mocks/workflow_tasks_mock'
import { CASES_BY_INTAKE_DATA } from '../mocks/intake_management_mock'

// Định nghĩa cấu trúc chuẩn cho 7 giai đoạn trong luồng công việc
interface WorkflowStageInfo {
  id: WeekStageId
  stepNumber: string
  weekLabel: string
  title: string
  leadDepartment: DepartmentCode
  coordinatingDepartments: DepartmentCode[]
  standardDuration: string
  description: string
  gatingRule: string
  keyChecklist: string[]
}

const WORKFLOW_STAGES_CONFIG: WorkflowStageInfo[] = [
  {
    id: 'W01_02',
    stepNumber: 'BƯỚC 01',
    weekLabel: '2 tuần đầu',
    title: 'Tiếp nhận & Xử lý hồ sơ đầu vào',
    leadDepartment: 'HO_SO',
    coordinatingDepartments: ['KE_TOAN', 'DAO_TAO'],
    standardDuration: 'Ngày 1 — Ngày 14',
    description: 'Thu thập 10 hạng mục giấy tờ đầu vào theo TB 12/2026, thẩm định năng lực tài chính & ký hợp đồng du học trọn gói.',
    gatingRule: 'Nhân thân nhất quán 100%, đủ giấy tờ gốc, ký hợp đồng & thu phí dịch vụ Lần 1 (20.000.000 VNĐ).',
    keyChecklist: [
      'Thu thập Học bạ THPT và Bằng tốt nghiệp bản gốc',
      'Xác minh Sổ đỏ đất ở & ĐKKD hộ cá thể theo TB 12/2026',
      'Kiểm tra tính nhất quán thông tin nhân thân trên CCCD & Mẫu CT07',
      'Ký hợp đồng dịch vụ du học & Thu phí dịch vụ Lần 1 (20 triệu)'
    ]
  },
  {
    id: 'W03',
    stepNumber: 'BƯỚC 02',
    weekLabel: 'Tuần 3 — 8',
    title: 'Xử lý hồ sơ trường & Học tiếng',
    leadDepartment: 'HO_SO',
    coordinatingDepartments: ['DAO_TAO'],
    standardDuration: 'Tuần 3 — Tuần 8',
    description: 'Dịch thuật công chứng tư pháp tiếng Hàn, xin tem Cục Lãnh sự BNG & tem Đại sứ quán Hàn Quốc, đào tạo tiếng Hàn Sơ cấp.',
    gatingRule: 'Toàn bộ văn bằng chứng chỉ được hợp pháp hóa đầy đủ 2 tem; điểm chuyên cần tiếng Hàn đạt tối thiểu 90%.',
    keyChecklist: [
      'Dịch thuật công chứng Học bạ, Bằng cấp sang tiếng Hàn',
      'Dán tem Hợp pháp hóa Cục Lãnh sự Bộ Ngoại Giao VN',
      'Dán tem Hợp pháp hóa Đại sứ quán Hàn Quốc tại Hà Nội',
      'Hoàn thành học phần Sơ cấp 1 & Bản Kế hoạch học tập (Study Plan)'
    ]
  },
  {
    id: 'W09',
    stepNumber: 'BƯỚC 03',
    weekLabel: 'Tuần 9',
    title: 'Nộp hồ sơ trường đối tác',
    leadDepartment: 'DOI_NGOAI',
    coordinatingDepartments: ['HO_SO'],
    standardDuration: 'Tuần 9',
    description: 'Đối soát GPA và điều kiện vùng miền, hoàn thiện đơn Online trên cổng trường và gửi EMS hỏa tốc sang Hàn Quốc.',
    gatingRule: 'Hồ sơ nộp trước hạn chót trường ≥ 5 ngày; có mã vận đơn bưu chính EMS quốc tế & email biên nhận từ trường.',
    keyChecklist: [
      'Đối soát điều kiện GPA và vùng miền khớp tiêu chí trường',
      'Nộp đơn đăng ký Online trên cổng tuyển sinh trường HQ',
      'Gửi hồ sơ bản cứng chuyển phát nhanh quốc tế DHL/EMS',
      'Theo dõi vận đơn và nhận Giấy biên nhận từ trường'
    ]
  },
  {
    id: 'W10',
    stepNumber: 'BƯỚC 04',
    weekLabel: 'Tuần 10',
    title: 'Phỏng vấn trường & Invoice',
    leadDepartment: 'DOI_NGOAI',
    coordinatingDepartments: ['DAO_TAO', 'KE_TOAN'],
    standardDuration: 'Tuần 10',
    description: 'Luyện phỏng vấn 1-1, hỗ trợ học viên thi Zoom với giáo sư HQ, nhận kết quả đỗ và hóa đơn học phí chính thức (Invoice).',
    gatingRule: 'Đậu phỏng vấn trường; hồ sơ trường hoàn thành 100%; thu phí dịch vụ Lần 2 (30.000.000 VNĐ) trong 3 ngày sau Invoice.',
    keyChecklist: [
      'Luyện Mock Interview 1-1 các câu hỏi trọng điểm của trường',
      'Hỗ trợ học viên thi phỏng vấn trực tuyến qua Zoom với giáo sư',
      'Tiếp nhận Giấy báo đỗ và Invoice học phí KRW từ trường',
      'Kế toán thông báo và thu phí dịch vụ du học Lần 2 (30 triệu)'
    ]
  },
  {
    id: 'W11',
    stepNumber: 'BƯỚC 05',
    weekLabel: 'Tuần 11 — 13',
    title: 'Hồ sơ Lãnh sự & Mở sổ K-Study',
    leadDepartment: 'HO_SO',
    coordinatingDepartments: ['KE_TOAN', 'DAO_TAO'],
    standardDuration: 'Tuần 11 — Tuần 13',
    description: 'Mở tài khoản đóng băng K-Study 10.000 USD tại Shinhan Bank / Woori Bank, khám lao tại BV chỉ định và hoàn tất hồ sơ Lãnh sự.',
    gatingRule: 'Hồ sơ lãnh sự hoàn thành 100% trước tối thiểu 3 ngày có lịch hẹn nộp Visa; có xác nhận đóng băng $10k & phiếu khám lao âm tính.',
    keyChecklist: [
      'Mở sổ đóng băng K-Study 10.000 USD tại Shinhan Bank / Woori Bank',
      'Khám lao phổi tại BV chỉ định của Lãnh sự (BV Phổi TW / Chợ Rẫy)',
      'Dịch thuật công chứng Phiếu Lý lịch tư pháp số 1',
      'Thẩm tra chéo hồ sơ Lãnh sự trước tối thiểu 3 ngày nộp Visa'
    ]
  },
  {
    id: 'W14',
    stepNumber: 'BƯỚC 06',
    weekLabel: 'Tuần 14 — 18',
    title: 'Nộp Visa KVAC & Cấp Visa',
    leadDepartment: 'HO_SO',
    coordinatingDepartments: ['DOI_NGOAI'],
    standardDuration: 'Tuần 14 — Tuần 18',
    description: 'Đặt lịch hẹn trực tuyến và nộp hồ sơ visa D4-1 tại Trung tâm KVAC, theo dõi tiến độ thẩm tra trên Korea Visa Portal.',
    gatingRule: 'Có biên lai tiếp nhận KVAC và mã tra cứu; nhận Visa Grant Notice chính thức được cấp từ Bộ Tư pháp Hàn Quốc.',
    keyChecklist: [
      'Đặt lịch hẹn và nộp hồ sơ trực tiếp tại Trung tâm KVAC',
      'Cập nhật mã tra cứu lên hệ thống Korea Visa Portal',
      'Theo dõi tiến độ thẩm tra hồ sơ định kỳ 2 ngày/lần',
      'Tải và in Visa Grant Notice chính thức'
    ]
  },
  {
    id: 'W19_20',
    stepNumber: 'BƯỚC 07',
    weekLabel: 'Tuần 19 — 20',
    title: 'Thu phí Lần 3 & Xuất cảnh bàn giao KTX',
    leadDepartment: 'KE_TOAN',
    coordinatingDepartments: ['DOI_NGOAI', 'DAO_TAO'],
    standardDuration: 'Tuần 19 — Tuần 20',
    description: 'Kế toán kích hoạt thu phí Lần 3 (65 triệu), xuất vé máy bay theo định mức TB 43, tổ chức orientation và đón sân bay Incheon nhận KTX.',
    gatingRule: 'Kế toán thu phí Lần 3 trong 3 ngày làm việc sau có Visa; xuất vé máy bay đúng hạn mức ≤ 250 USD; bàn giao phòng KTX an toàn.',
    keyChecklist: [
      'Kế toán kích hoạt và thu phí dịch vụ du học Lần 3 (65 triệu)',
      'Xuất vé máy bay 1 chiều đi Hàn Quốc (định mức ≤ 250 USD theo TB 43)',
      'Tổ chức buổi Định hướng xuất cảnh (Pre-departure Orientation)',
      'Đón tại sân bay Incheon và bàn giao phòng ký túc xá tại Hàn Quốc'
    ]
  }
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_WORKFLOW_TASKS)
  const [selectedStageId, setSelectedStageId] = useState<WeekStageId>('W11') // Default to stage with urgent action items

  // Filters within active stage
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL')
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  // Modal State for adding new task
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDepartment, setNewDepartment] = useState<DepartmentCode>('HO_SO')
  const [newPriority, setNewPriority] = useState<'URGENT' | 'HIGH' | 'MEDIUM'>('HIGH')
  const [newStudentCode, setNewStudentCode] = useState('SHD2026-005')
  const [newAssigneeName, setNewAssigneeName] = useState('Nguyễn Văn Hải')
  const [newAssigneeRole, setNewAssigneeRole] = useState('Trưởng nhóm Hồ sơ')
  const [newDueAt, setNewDueAt] = useState('2026-10-28')
  const [newDescription, setNewDescription] = useState('')

  // Toggle task completion
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.taskId === taskId) {
          const isDone = t.status === 'COMPLETED'
          return {
            ...t,
            status: isDone ? 'IN_PROGRESS' : 'COMPLETED',
            completedAt: isDone ? undefined : new Date().toISOString().split('T')[0]
          }
        }
        return t
      })
    )
  }

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đầu việc này khỏi luồng công việc?')) {
      setTasks((prev) => prev.filter((t) => t.taskId !== taskId))
    }
  }

  // Add task handler
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const studentInfo = CASES_BY_INTAKE_DATA.find((s) => s.studentCode === newStudentCode)

    const newTask: Task = {
      taskId: `TASK-${Date.now()}`,
      title: newTitle.trim(),
      department: newDepartment,
      stageId: selectedStageId,
      stageCode: selectedStageId,
      status: 'TODO',
      priority: newPriority,
      studentCode: newStudentCode,
      studentName: studentInfo?.studentName || 'Học viên',
      targetIntake: studentInfo?.intakeName || 'Kỳ 12/2026',
      targetSchool: studentInfo?.targetSchool || 'Đại học Hàn Quốc',
      assigneeName: newAssigneeName.trim() || 'Chuyên viên phụ trách',
      assigneeRole: newAssigneeRole.trim(),
      dueAt: newDueAt || new Date().toISOString().split('T')[0],
      description: newDescription.trim() || 'Chưa có ghi chú bổ sung.'
    }

    setTasks((prev) => [newTask, ...prev])
    setIsAddModalOpen(false)
    setNewTitle('')
    setNewDescription('')
  }

  // Stats for the active stage
  const selectedStageConfig = useMemo(() => {
    return WORKFLOW_STAGES_CONFIG.find((s) => s.id === selectedStageId) || WORKFLOW_STAGES_CONFIG[0]
  }, [selectedStageId])

  // All tasks in the selected stage
  const stageTasks = useMemo(() => {
    return tasks.filter((t) => t.stageId === selectedStageId)
  }, [tasks, selectedStageId])

  // Filtered tasks for the selected stage
  const filteredStageTasks = useMemo(() => {
    return stageTasks.filter((t) => {
      // Department filter
      if (departmentFilter !== 'ALL' && t.department !== departmentFilter) return false
      // Priority filter
      if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false
      // Status filter
      if (statusFilter === 'TODO' && t.status === 'COMPLETED') return false
      if (statusFilter === 'COMPLETED' && t.status !== 'COMPLETED') return false

      // Keyword search
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase()
        const matchTitle = t.title.toLowerCase().includes(q)
        const matchStudent = (t.studentName || '').toLowerCase().includes(q)
        const matchCode = (t.studentCode || '').toLowerCase().includes(q)
        const matchAssignee = t.assigneeName.toLowerCase().includes(q)
        const matchDesc = t.description.toLowerCase().includes(q)
        if (!matchTitle && !matchStudent && !matchCode && !matchAssignee && !matchDesc) return false
      }

      return true
    })
  }, [stageTasks, departmentFilter, priorityFilter, statusFilter, searchKeyword])

  // Compute stats across all stages for the workflow pipeline
  const workflowStats = useMemo(() => {
    const totalAll = tasks.length
    const completedAll = tasks.filter((t) => t.status === 'COMPLETED').length
    const urgentAll = tasks.filter((t) => t.priority === 'URGENT' && t.status !== 'COMPLETED').length

    const stageMap: Record<WeekStageId, { total: number; completed: number; urgent: number }> = {
      W01_02: { total: 0, completed: 0, urgent: 0 },
      W03: { total: 0, completed: 0, urgent: 0 },
      W09: { total: 0, completed: 0, urgent: 0 },
      W10: { total: 0, completed: 0, urgent: 0 },
      W11: { total: 0, completed: 0, urgent: 0 },
      W14: { total: 0, completed: 0, urgent: 0 },
      W19_20: { total: 0, completed: 0, urgent: 0 }
    }

    tasks.forEach((t) => {
      if (stageMap[t.stageId]) {
        stageMap[t.stageId].total += 1
        if (t.status === 'COMPLETED') stageMap[t.stageId].completed += 1
        if (t.priority === 'URGENT' && t.status !== 'COMPLETED') stageMap[t.stageId].urgent += 1
      }
    })

    return {
      totalAll,
      completedAll,
      urgentAll,
      rateAll: totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0,
      stageMap
    }
  }, [tasks])

  // Active stage stats
  const activeStageStats = useMemo(() => {
    const total = stageTasks.length
    const completed = stageTasks.filter((t) => t.status === 'COMPLETED').length
    const inProgress = stageTasks.filter((t) => t.status !== 'COMPLETED').length
    const urgent = stageTasks.filter((t) => t.priority === 'URGENT' && t.status !== 'COMPLETED').length
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, inProgress, urgent, percent }
  }, [stageTasks])

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#033399] text-white shadow-xs">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Luồng Công Việc Phối Hợp (Workflow Pipeline)
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">
                Quy trình 7 giai đoạn liên kết 4 bộ phận (Hồ sơ • Đào tạo • Đối ngoại • Kế toán). Click vào từng ô trong luồng để xem và điều phối chi tiết công việc.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge />
        </div>
      </div>

      {/* Global Pipeline Summary Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Tổng đầu việc trong luồng
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{workflowStats.totalAll}</span>
            <span className="text-xs text-slate-400">việc (7 giai đoạn)</span>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Đã hoàn thành
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-800">{workflowStats.completedAll}</span>
            <span className="text-xs font-semibold text-emerald-600">
              ({workflowStats.rateAll}% tiến độ)
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3.5 shadow-2xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
            Đang xử lý / Cần làm
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#033399]">
              {workflowStats.totalAll - workflowStats.completedAll}
            </span>
            <span className="text-xs text-blue-600">việc đang chạy</span>
          </div>
        </div>

        <div
          className={`rounded-xl border p-3.5 shadow-2xs ${
            workflowStats.urgentAll > 0
              ? 'border-rose-300 bg-rose-50/60 text-rose-900'
              : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700 flex items-center gap-1">
            {workflowStats.urgentAll > 0 && (
              <span className="inline-block h-2 w-2 rounded-full bg-rose-600 animate-ping" />
            )}
            Việc khẩn cấp cần tháo gỡ
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-700">{workflowStats.urgentAll}</span>
            <span className="text-xs text-rose-600">điểm nghẽn hạn chót</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-xl border border-indigo-200 bg-indigo-50/40 p-3.5 shadow-2xs flex flex-col justify-center">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
            4 Bộ phận phối hợp
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">Hồ sơ</span>
            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-800">Đào tạo</span>
            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800">Đối ngoại</span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">Kế toán</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE WORKFLOW PIPELINE (LUỒNG CÔNG VIỆC TRỰC QUAN) */}
      {/* ========================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">🔀</span>
              <span>Luồng Tiến Trình 7 Giai Đoạn (Bấm vào từng ô để xem chi tiết công việc)</span>
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Quy trình chuẩn hóa xuyên suốt từ lúc ký hợp đồng đầu vào cho đến khi xuất cảnh và bàn giao KTX tại Hàn Quốc.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Ô được chọn hiển thị chi tiết bên dưới
            </span>
          </div>
        </div>

        {/* The 7 Connected Stages Flow */}
        <div className="relative overflow-x-auto pb-4 pt-1">
          <div className="flex min-w-[1020px] items-stretch gap-2.5">
            {WORKFLOW_STAGES_CONFIG.map((stage, idx) => {
              const isSelected = selectedStageId === stage.id
              const stageStat = workflowStats.stageMap[stage.id]
              const percent = stageStat.total > 0 ? Math.round((stageStat.completed / stageStat.total) * 100) : 0
              const leadDeptMeta = DEPARTMENTS[stage.leadDepartment]

              return (
                <div key={stage.id} className="relative flex-1 min-w-[138px] group">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStageId(stage.id)
                      // Reset child filters on stage switch for clean view
                      setDepartmentFilter('ALL')
                      setPriorityFilter('ALL')
                      setStatusFilter('ALL')
                      setSearchKeyword('')
                    }}
                    className={`relative w-full h-full text-left rounded-xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#033399] bg-gradient-to-b from-blue-50/90 to-indigo-50/30 ring-3 ring-[#033399]/20 shadow-md translate-y-[-2px]'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/60 hover:shadow-xs'
                    }`}
                  >
                    {/* Active downward triangle pointer */}
                    {isSelected && (
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-[#033399] z-20" />
                    )}

                    {/* Step & Timeline Header */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider ${
                            isSelected ? 'bg-[#033399] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {stage.stepNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{stage.weekLabel}</span>
                      </div>

                      {/* Stage Title */}
                      <h3
                        className={`text-xs font-bold line-clamp-2 leading-snug min-h-[32px] ${
                          isSelected ? 'text-[#033399]' : 'text-slate-800'
                        }`}
                        title={stage.title}
                      >
                        {stage.title}
                      </h3>

                      {/* Lead Department Pill */}
                      <div className="mt-2">
                        <span
                          className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold border ${leadDeptMeta.bgLight}`}
                        >
                          {leadDeptMeta.shortName}
                        </span>
                      </div>
                    </div>

                    {/* Stage Stats & Urgent Notification */}
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      {stageStat.urgent > 0 && (
                        <div className="mb-1 flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-800 animate-pulse">
                          <span>⚠️</span>
                          <span>{stageStat.urgent} việc khẩn</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-slate-500">
                          {stageStat.completed}/{stageStat.total} việc
                        </span>
                        <span
                          className={`font-mono font-bold ${
                            percent === 100
                              ? 'text-emerald-700'
                              : isSelected
                              ? 'text-[#033399]'
                              : 'text-slate-600'
                          }`}
                        >
                          {percent}%
                        </span>
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full transition-all duration-300 ${
                            percent === 100
                              ? 'bg-emerald-500'
                              : isSelected
                              ? 'bg-[#033399]'
                              : 'bg-blue-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Flow Connector Arrow between stages */}
                  {idx < WORKFLOW_STAGES_CONFIG.length - 1 && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden lg:block text-slate-300 pointer-events-none">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STAGE DETAILS SECTION (HIỂN THỊ CHI TIẾT Ô TRONG LUỒNG) */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {/* Selected Stage Banner Card */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-white p-5 shadow-xs">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#033399] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white shadow-2xs">
                  {selectedStageConfig.stepNumber} • {selectedStageConfig.weekLabel}
                </span>
                <span className="rounded-lg bg-white border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  Thời lượng chuẩn: <strong className="text-slate-800">{selectedStageConfig.standardDuration}</strong>
                </span>
                <span className="rounded-lg bg-blue-100 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-900">
                  Chủ trì: {DEPARTMENTS[selectedStageConfig.leadDepartment].name}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  {selectedStageConfig.title}
                </h2>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {selectedStageConfig.description}
                </p>
              </div>

              {/* Gating Condition & Checklist */}
              <div className="pt-2 border-t border-blue-200/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white/80 border border-slate-200/80 p-2.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-900">
                    <span>🎯</span>
                    <span>Điều kiện nghiệm thu chuyển bước (Gating Rule):</span>
                  </span>
                  <p className="mt-1 text-slate-600 font-medium leading-normal">
                    {selectedStageConfig.gatingRule}
                  </p>
                </div>

                <div className="rounded-xl bg-white/80 border border-slate-200/80 p-2.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-indigo-900">
                    <span>📋</span>
                    <span>Hạng mục kiểm tra bắt buộc:</span>
                  </span>
                  <ul className="mt-1 space-y-0.5 text-slate-600 font-medium list-disc list-inside">
                    {selectedStageConfig.keyChecklist.slice(0, 3).map((item, i) => (
                      <li key={i} className="truncate" title={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions & Stage Progress Stats */}
            <div className="flex flex-col items-end gap-3 shrink-0 lg:border-l lg:border-blue-200/70 lg:pl-6">
              <div className="w-full sm:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3">
                <div className="text-left lg:text-right">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Tiến độ giai đoạn</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#033399]">
                      {activeStageStats.percent}%
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      ({activeStageStats.completed}/{activeStageStats.total} việc)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#033399] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition-all cursor-pointer hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ Thêm việc cho bước này</span>
                </button>
              </div>

              {activeStageStats.urgent > 0 && (
                <div className="flex items-center gap-1.5 rounded-lg bg-rose-100 border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-800">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping" />
                  <span>Có {activeStageStats.urgent} đầu việc khẩn cấp cần giải quyết ngay</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar: Filters, Search, Department Pills */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Tìm việc theo tên, mã/tên học viên, người phụ trách..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-semibold text-slate-500 shrink-0">Phòng ban:</span>
              <button
                type="button"
                onClick={() => setDepartmentFilter('ALL')}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  departmentFilter === 'ALL'
                    ? 'bg-[#033399] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất cả ({stageTasks.length})
              </button>

              {(['HO_SO', 'DAO_TAO', 'DOI_NGOAI', 'KE_TOAN'] as DepartmentCode[]).map((dept) => {
                const count = stageTasks.filter((t) => t.department === dept).length
                const meta = DEPARTMENTS[dept]
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setDepartmentFilter(dept)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      departmentFilter === dept
                        ? `${meta.badgeColor} shadow-2xs`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {meta.shortName} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sub Filters: Priority & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Độ ưu tiên:</span>
              <div className="flex gap-1">
                {[
                  { key: 'ALL', label: 'Tất cả' },
                  { key: 'URGENT', label: 'Khẩn cấp (URGENT)', badge: 'bg-rose-100 text-rose-800' },
                  { key: 'HIGH', label: 'Cao (HIGH)', badge: 'bg-amber-100 text-amber-800' },
                  { key: 'MEDIUM', label: 'Bình thường', badge: 'bg-slate-100 text-slate-700' }
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPriorityFilter(p.key)}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition-all cursor-pointer ${
                      priorityFilter === p.key
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Trạng thái:</span>
              <div className="flex gap-1">
                {[
                  { key: 'ALL', label: 'Tất cả' },
                  { key: 'TODO', label: 'Cần làm' },
                  { key: 'COMPLETED', label: 'Đã hoàn tất' }
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStatusFilter(s.key)}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilter === s.key
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Task Cards Grid for this Stage */}
        <div className="space-y-3">
          {filteredStageTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-800">
                Không tìm thấy đầu việc nào trong bộ lọc này
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Thử thay đổi bộ lọc phòng ban, độ ưu tiên hoặc thêm một đầu việc mới cho giai đoạn này.
              </p>
              <button
                type="button"
                onClick={() => {
                  setDepartmentFilter('ALL')
                  setPriorityFilter('ALL')
                  setStatusFilter('ALL')
                  setSearchKeyword('')
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            filteredStageTasks.map((task) => {
              const isDone = task.status === 'COMPLETED'
              const deptMeta = DEPARTMENTS[task.department]
              const isUrgent = task.priority === 'URGENT' && !isDone
              const isHigh = task.priority === 'HIGH' && !isDone

              return (
                <div
                  key={task.taskId}
                  className={`rounded-2xl border p-4 transition-all duration-200 ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                      : isUrgent
                      ? 'border-rose-300 bg-white shadow-xs hover:border-rose-400 ring-1 ring-rose-200'
                      : 'border-slate-200 bg-white shadow-2xs hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    {/* Left: Checkbox & Content */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggleTaskStatus(task.taskId)}
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all cursor-pointer ${
                          isDone
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300 bg-white hover:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        }`}
                        title={isDone ? 'Đánh dấu chưa hoàn tất' : 'Đánh dấu hoàn tất'}
                      >
                        {isDone && (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        {/* Badges: Department, Priority, Stage */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${deptMeta.bgLight}`}
                          >
                            {deptMeta.name}
                          </span>

                          {isUrgent && (
                            <span className="flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-700 animate-pulse">
                              <span>🔥</span> KHẨN CẤP
                            </span>
                          )}

                          {isHigh && (
                            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              Ưu tiên cao
                            </span>
                          )}

                          {task.priority === 'MEDIUM' && (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              Bình thường
                            </span>
                          )}

                          {isDone && (
                            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              ✓ Đã xong ({task.completedAt || 'Hôm nay'})
                            </span>
                          )}
                        </div>

                        {/* Task Title */}
                        <h3
                          className={`text-sm font-bold leading-snug ${
                            isDone ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </h3>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {task.description}
                          </p>
                        )}

                        {/* Associated Student Info Card */}
                        {task.studentCode && (
                          <div className="mt-2 inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-1.5 text-xs">
                            <span className="text-[11px] font-bold text-slate-500">Học viên:</span>
                            <span className="font-mono font-bold text-blue-700">{task.studentCode}</span>
                            <span className="font-bold text-slate-800">{task.studentName}</span>
                            {task.targetSchool && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600">{task.targetSchool}</span>
                              </>
                            )}
                            {task.targetIntake && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500 font-medium">{task.targetIntake}</span>
                              </>
                            )}
                            <Link
                              to={`/cases?search=${task.studentCode}`}
                              className="ml-1 text-[11px] font-bold text-[#033399] hover:underline"
                            >
                              Xem hồ sơ →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Assignee, Deadline & Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                            {task.assigneeName.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-800">{task.assigneeName}</span>
                        </div>
                        {task.assigneeRole && (
                          <div className="text-[10px] text-slate-400 mt-0.5">{task.assigneeRole}</div>
                        )}
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                            isUrgent
                              ? 'bg-rose-100 text-rose-700 font-bold'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Hạn: {new Date(task.dueAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleTaskStatus(task.taskId)}
                          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          {isDone ? 'Mở lại việc' : 'Hoàn thành'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.taskId)}
                          className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Xóa đầu việc"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ADD TASK MODAL DIALOG */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Thêm đầu việc mới cho {selectedStageConfig.stepNumber}
                </h3>
                <p className="text-xs text-slate-500">
                  Giai đoạn: {selectedStageConfig.title} ({selectedStageConfig.weekLabel})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700">Tên đầu việc / Nhiệm vụ *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đôn đốc nộp bổ sung bản gốc sổ đỏ đất ở..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Bộ phận phụ trách</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => {
                      const dept = e.target.value as DepartmentCode
                      setNewDepartment(dept)
                      if (dept === 'HO_SO') {
                        setNewAssigneeName('Nguyễn Văn Hải')
                        setNewAssigneeRole('Trưởng nhóm Hồ sơ')
                      } else if (dept === 'DAO_TAO') {
                        setNewAssigneeName('Phạm Quang Minh')
                        setNewAssigneeRole('Giảng viên Đào tạo')
                      } else if (dept === 'DOI_NGOAI') {
                        setNewAssigneeName('Trần Thu Hà')
                        setNewAssigneeRole('Trưởng phòng Đối ngoại')
                      } else {
                        setNewAssigneeName('Vũ Minh Châu')
                        setNewAssigneeRole('Kế toán trưởng')
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="HO_SO">Bộ phận Hồ sơ</option>
                    <option value="DAO_TAO">Bộ phận Đào tạo</option>
                    <option value="DOI_NGOAI">Bộ phận Đối ngoại</option>
                    <option value="KE_TOAN">Bộ phận Kế toán</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Mức độ ưu tiên</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'URGENT' | 'HIGH' | 'MEDIUM')}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="URGENT">Khẩn cấp (URGENT - Cần giải quyết ngay)</option>
                    <option value="HIGH">Ưu tiên cao (HIGH)</option>
                    <option value="MEDIUM">Bình thường (MEDIUM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Gắn với hồ sơ học viên</label>
                  <select
                    value={newStudentCode}
                    onChange={(e) => setNewStudentCode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  >
                    {CASES_BY_INTAKE_DATA.map((c) => (
                      <option key={c.studentCode} value={c.studentCode}>
                        {c.studentCode} - {c.studentName} ({c.intakeName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Hạn hoàn thành</label>
                  <input
                    type="date"
                    required
                    value={newDueAt}
                    onChange={(e) => setNewDueAt(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Chuyên viên phụ trách</label>
                  <input
                    type="text"
                    required
                    value={newAssigneeName}
                    onChange={(e) => setNewAssigneeName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Chức vụ / Vị trí</label>
                  <input
                    type="text"
                    value={newAssigneeRole}
                    onChange={(e) => setNewAssigneeRole(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Mô tả & Hướng dẫn xử lý chi tiết</label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú quy trình, điều kiện hồ sơ, tài liệu cần nộp..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#033399] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 cursor-pointer"
                >
                  Tạo đầu việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
