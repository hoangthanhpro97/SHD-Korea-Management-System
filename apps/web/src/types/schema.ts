export type DepartmentCode = 'HO_SO' | 'DAO_TAO' | 'DOI_NGOAI' | 'KE_TOAN'

// 7 Mốc tiến độ chuẩn theo tuần
export type WeekStageId =
  | 'W01_02' // Tiếp nhận, xử lý hồ sơ đầu vào (2 tuần đầu)
  | 'W03' // Xử lý hồ sơ trường (tuần 3)
  | 'W09' // Nộp hồ sơ trường (tuần 9)
  | 'W10' // Phỏng vấn trường (tuần 10)
  | 'W11' // Hồ sơ lãnh sự (tuần 11)
  | 'W14' // Nộp visa (tuần 14)
  | 'W19_20' // Xuất cảnh bàn giao (tuần 19-20)

export interface WeekStageDefinition {
  id: WeekStageId
  weekLabel: string
  title: string
  subTitle: string
  responsibleUnit: string
  standardDuration: string
  successCondition: string
}

export const WEEK_STAGES: WeekStageDefinition[] = [
  {
    id: 'W01_02',
    weekLabel: '2 tuần đầu',
    title: 'Tiếp nhận, xử lý hồ sơ đầu vào',
    subTitle: 'Thu thập 10 hạng mục giấy tờ đầu vào theo TB 12 & thẩm định tài chính',
    responsibleUnit: 'Bộ phận Hồ sơ',
    standardDuration: 'Ngày 1 — Ngày 14',
    successCondition: 'Nhân thân nhất quán, đủ giấy tờ gốc, xác minh nguồn tiền gia đình'
  },
  {
    id: 'W03',
    weekLabel: 'Tuần 3',
    title: 'Xử lý hồ sơ trường',
    subTitle: 'Dịch thuật công chứng, chứng nhận lãnh sự BNG & ĐSQ Hàn Quốc',
    responsibleUnit: 'Bộ phận Hồ sơ',
    standardDuration: 'Tuần 3 — Tuần 8',
    successCondition: 'Bộ dịch thuật công chứng & tem hợp pháp hóa hoàn tất'
  },
  {
    id: 'W09',
    weekLabel: 'Tuần 9',
    title: 'Nộp hồ sơ trường',
    subTitle: 'Đối ngoại hoàn tất form trường, gửi EMS và nhận biên nhận chính thức',
    responsibleUnit: 'Bộ phận Đối ngoại',
    standardDuration: 'Tuần 9',
    successCondition: 'Có mã vận đơn EMS & Email/Biên lai xác nhận từ phòng quốc tế trường'
  },
  {
    id: 'W10',
    weekLabel: 'Tuần 10',
    title: 'Phỏng vấn trường & Invoice',
    subTitle: 'Luyện phỏng vấn song song, đỗ trường & nhận Invoice học phí',
    responsibleUnit: 'Bộ phận Đối ngoại & Đào tạo & Kế toán',
    standardDuration: 'Tuần 10',
    successCondition: 'Đỗ phỏng vấn, có Invoice KRW, Hồ sơ trường 100%, thu phí Lần 2 (30M)'
  },
  {
    id: 'W11',
    weekLabel: 'Tuần 11',
    title: 'Hồ sơ lãnh sự',
    subTitle: 'Mở sổ đóng băng K-Study 10.000 USD, khám lao, xong trước ≥ 3 ngày nộp visa',
    responsibleUnit: 'Bộ phận Hồ sơ',
    standardDuration: 'Tuần 11 — Tuần 13',
    successCondition: 'Hồ sơ lãnh sự 100% hoàn thành trước tối thiểu 3 ngày có lịch nộp'
  },
  {
    id: 'W14',
    weekLabel: 'Tuần 14',
    title: 'Nộp visa KVAC',
    subTitle: 'Nộp hồ sơ tại KVAC / TLSQ, lấy mã biên nhận và theo dõi kết quả',
    responsibleUnit: 'Bộ phận Hồ sơ & Đối ngoại',
    standardDuration: 'Tuần 14 — Tuần 18',
    successCondition: 'Có mã tra cứu portal & Nhận Visa Grant Notice chính thức'
  },
  {
    id: 'W19_20',
    weekLabel: 'Tuần 19-20',
    title: 'Xuất cảnh, bàn giao',
    subTitle: 'Thu phí lần 3 (65M), xuất vé máy bay, đón sân bay Incheon & bàn giao KTX',
    responsibleUnit: 'Bộ phận Kế toán & Dịch vụ sinh viên',
    standardDuration: 'Tuần 19 — Tuần 20',
    successCondition: 'Nhập cảnh thành công, nhận phòng ký túc xá tại Hàn Quốc'
  }
]

export interface DossierItem {
  docId: string
  name: string
  stageId: WeekStageId
  category: 'GOC' | 'CONG_CHUNG' | 'HOP_PHAP_HOA' | 'TAI_CHINH' | 'BIEU_MAU' | 'Y_TE'
  status: 'COMPLETED' | 'MISSING' | 'PENDING'
  completedAt?: string
  deadline: string
  requiredBy: string // Quy định bởi (TB 12/2026, Trường HQ, Lãnh sự)
  note?: string
}

// Cấu trúc chuẩn đồng nhất cho mọi kỳ bay
export interface IntakeFlightPeriod {
  periodId: string
  name: string // Kỳ bay Tháng 3, 6, 9, 12
  intakeMonth: number // 3, 6, 9, 12
  intakeYear: number // 2026, 2027
  isMainIntake: boolean // Tháng 3 & 9 là kỳ chính
  flightEstimatedDate: string
  visaDeadline: string
  schoolDeadline: string
  
  // Các chỉ số chuẩn đồng nhất cho mọi kỳ bay theo yêu cầu
  targetKPI: number // 1. Chỉ tiêu
  currentActive: number // Số học viên thực tế
  schoolDossier100Count: number // 2. Hồ sơ trường 100%
  invoiceReceivedCount: number // 3. Đã có Invoice
  visaDossier100Count: number // 4. Hồ sơ Visa 100%
  applyingVisaCount: number // 5. Đang xin Visa
  visaGrantedCount: number // 6. Đã có Visa
  
  // 7. Cảnh báo tiến độ của học viên trong kỳ bay
  delayWarnings: {
    studentCode: string
    studentName: string
    currentStage: string
    warningType: 'URGENT' | 'WARNING'
    issueDescription: string
    missingDocuments: string[]
    deadline: string
    suggestedAction: string
  }[]
}

// Tiến độ đào tạo chi tiết
export interface TrainingProgress {
  koreanStudyStatus: 'DANG_HOC' | 'HOAN_THANH_SO_CAP_1' | 'HOAN_THANH_SO_CAP_2'
  currentClass: string
  attendanceRate: number // %
  missedDays: number // số buổi nghỉ
  topikStatus: {
    hasTopik: boolean
    level?: string // TOPIK 1, TOPIK 2, TOPIK 3
    score?: number
    examDate?: string
    targetGoal: string
  }
  schoolInterviewPrep: {
    status: 'CHUA_LUYEN' | 'DANG_LUYEN' | 'DA_SAN_SANG'
    mockInterviewScore?: number // Thang 10
    teacherAssessment?: string
  }
  consularInterviewPrep: {
    status: 'CHUA_LUYEN' | 'DANG_LUYEN' | 'DA_SAN_SANG'
    assessment?: string
  }
}

// Chi tiết học viên trong kỳ bay
export interface CaseByIntake {
  caseId: string
  studentId: string
  studentCode: string
  studentName: string
  dob: string
  phone: string
  periodId: string // Thuộc kỳ bay nào
  intakeName: string
  targetSchool: string
  targetMajor: string
  currentStageId: WeekStageId // 1 trong 7 mốc tuần
  stageStatus: 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'
  
  // Tiến độ đào tạo
  training: TrainingProgress

  // Danh mục hồ sơ chi tiết theo 7 mốc tuần
  dossierItems: Record<WeekStageId, DossierItem[]>

  // Thu phí dịch vụ
  paymentPhases: {
    phase1Paid: boolean // 20M
    phase2Paid: boolean // 30M
    phase3Paid: boolean // 65M
  }
}

// ========================================================
// HỆ THỐNG KIỂU DỮ LIỆU BỔ TRỢ (LEGACY & SWIMLANES & TASKS)
// ========================================================

export type StageCode = 'ST01' | 'ST02' | 'ST03' | 'ST04' | 'ST05' | 'ST06' | 'ST07'
export type StageStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' | 'READY_FOR_REVIEW'

export interface StageDefinition {
  code: StageCode
  number: number
  title: string
  subTitle: string
  responsibleUnit: string
  standardDuration: string
  gatingRules: string[]
  keyChecklist: string[]
}

export const STAGE_DEFINITIONS: Record<StageCode, StageDefinition> = {
  ST01: {
    code: 'ST01',
    number: 1,
    title: 'Tiếp nhận & Ký hợp đồng dịch vụ',
    subTitle: 'Thu thập 10 hạng mục giấy tờ đầu vào & Ký hợp đồng du học trọn gói 115 triệu',
    responsibleUnit: 'Bộ phận Hồ sơ & Kế toán',
    standardDuration: 'Ngày 1 — Ngày 14',
    gatingRules: [
      'Hợp đồng dịch vụ du học ký 2 bên và kế toán thu phí Lần 1 (20.000.000 VNĐ)',
      'Thu thập tối thiểu 8/10 hạng mục giấy tờ nhân thân gốc theo TB 12/2026'
    ],
    keyChecklist: [
      'Học bạ, Bằng tốt nghiệp THPT bản gốc',
      'Hộ chiếu, CCCD, Giấy xác nhận cư trú CT07',
      'Giấy tờ nhà đất (sổ đỏ) & ĐKKD hộ cá thể gia đình'
    ]
  },
  ST02: {
    code: 'ST02',
    number: 2,
    title: 'Xử lý & Dịch thuật hồ sơ trường',
    subTitle: 'Dịch thuật công chứng tiếng Hàn, tem Hợp pháp hóa Cục Lãnh sự BNG & ĐSQ Hàn Quốc',
    responsibleUnit: 'Bộ phận Hồ sơ',
    standardDuration: 'Tuần 3 — Tuần 8',
    gatingRules: [
      'Toàn bộ văn bằng chứng chỉ được hợp pháp hóa đầy đủ 2 tem',
      'Bộ hồ sơ tài chính gia đình được thẩm định tính xác thực và nguồn gốc dòng tiền'
    ],
    keyChecklist: [
      'Bản dịch công chứng Học bạ & Bằng cấp',
      'Tem Hợp pháp hóa Cục Lãnh sự BNG',
      'Tem Hợp pháp hóa Lãnh sự quán Hàn Quốc',
      'Bản Kế hoạch học tập (Study Plan)'
    ]
  },
  ST03: {
    code: 'ST03',
    number: 3,
    title: 'Nộp hồ sơ trường đối tác Hàn Quốc',
    subTitle: 'Đối ngoại khớp trường theo GPA và nguyện vọng, gửi EMS và nhận xác nhận',
    responsibleUnit: 'Bộ phận Đối ngoại',
    standardDuration: 'Tuần 9',
    gatingRules: [
      'Hồ sơ trường hoàn thành 100% trước hạn chót của trường tối thiểu 5 ngày',
      'Nhận mã biên nhận bưu chính EMS quốc tế gửi trường'
    ],
    keyChecklist: [
      'Đơn xin nhập học chuẩn form trường',
      'Mã vận đơn bưu chính EMS quốc tế',
      'Biên nhận tiếp nhận hồ sơ từ trường HQ'
    ]
  },
  ST04: {
    code: 'ST04',
    number: 4,
    title: 'Phỏng vấn trường & Nhận Invoice',
    subTitle: 'Luyện phỏng vấn, thi đỗ và nhận hóa đơn học phí chính thức',
    responsibleUnit: 'Bộ phận Đối ngoại & Đào tạo & Kế toán',
    standardDuration: 'Tuần 10',
    gatingRules: [
      'Đậu phỏng vấn trường đối tác (Điểm mock interview trước đó ≥ 8.0/10)',
      'Hồ sơ trường bắt buộc hoàn thành 100% khi nhận Invoice',
      'Kế toán thu phí Lần 2 (30.000.000 VNĐ) trong 3 ngày sau trúng tuyển'
    ],
    keyChecklist: [
      'Biên bản phỏng vấn trường',
      'Thư thông báo trúng tuyển (Letter of Acceptance)',
      'Invoice học phí & KTX từ trường HQ',
      'Phiếu thu Kế toán Lần 2'
    ]
  },
  ST05: {
    code: 'ST05',
    number: 5,
    title: 'Xử lý hồ sơ Lãnh sự & Mở sổ K-Study',
    subTitle: 'Mở sổ đóng băng 10.000 USD, khám lao phổi BV chỉ định, hoàn tất trước ≥ 3 ngày nộp',
    responsibleUnit: 'Bộ phận Hồ sơ',
    standardDuration: 'Tuần 11 — Tuần 13',
    gatingRules: [
      'Hồ sơ lãnh sự bắt buộc hoàn thành 100% trước tối thiểu 3 ngày khi có lịch nộp Visa',
      'Xác nhận mở sổ K-Study 10.000 USD tại Shinhan Bank / Woori Bank',
      'Phiếu khám lao âm tính từ BV chỉ định của Lãnh sự'
    ],
    keyChecklist: [
      'Giấy xác nhận số dư tài khoản đóng băng K-Study 10.000 USD',
      'Phiếu xét nghiệm lao phổi âm tính',
      'Phiếu Lý lịch tư pháp số 1 dịch công chứng',
      'Tờ khai xin visa Lãnh sự'
    ]
  },
  ST06: {
    code: 'ST06',
    number: 6,
    title: 'Nộp Visa tại KVAC & Nhận kết quả',
    subTitle: 'Nộp hồ sơ trực tiếp tại KVAC, lấy mã biên nhận và tra cứu kết quả',
    responsibleUnit: 'Bộ phận Hồ sơ & Đối ngoại',
    standardDuration: 'Tuần 14 — Tuần 18',
    gatingRules: [
      'Có biên lai tiếp nhận hồ sơ và mã tra cứu trên Korea Visa Portal',
      'Nhận Visa Grant Notice chính thức từ Bộ Tư pháp Hàn Quốc'
    ],
    keyChecklist: [
      'Biên lai nộp hồ sơ KVAC',
      'Mã tra cứu Visa Portal',
      'Bản in Visa Grant Notice'
    ]
  },
  ST07: {
    code: 'ST07',
    number: 7,
    title: 'Thu phí lần 3 & Xuất cảnh bàn giao KTX',
    subTitle: 'Kế toán thu 65 triệu, đặt vé máy bay, đón sân bay Incheon và nhận phòng KTX',
    responsibleUnit: 'Bộ phận Kế toán & Dịch vụ sinh viên',
    standardDuration: 'Tuần 19 — Tuần 20',
    gatingRules: [
      'Kế toán thu phí Lần 3 (65.000.000 VNĐ) trong vòng 3 ngày sau khi có Visa',
      'Xuất vé máy bay 1 chiều (tối đa 250 USD theo chính sách TB 43)',
      'Bàn giao ký túc xá thành công tại Hàn Quốc'
    ],
    keyChecklist: [
      'Phiếu thu Kế toán Lần 3',
      'Vé máy bay một chiều sang Hàn Quốc',
      'Biên bản bàn giao tại sân bay Incheon & nhận phòng KTX'
    ]
  }
}

export interface SchoolApplication {
  id?: string
  applicationId?: string
  studentName?: string
  priority?: number
  schoolName: string
  region?: string
  major: string
  status: string
  trackingCode?: string
  evidenceId?: string
  interviewDate?: string
  interviewResultNote?: string
  invoiceAmountKRW?: number
  invoiceReceivedAt?: string
}

export interface PaymentInstallment {
  phase: string
  name: string
  amount: number
  triggerDescription: string
  status: string
  paidAt?: string
  receiptNo?: string
  contractStored?: boolean
}

export interface SyncPointStatus {
  sync1InvoiceReady: boolean
  sync1Checklist: {
    interviewPassed: boolean
    schoolDossier100: boolean
    paymentPhase2Collected: boolean
  }
  sync2VisaReady: boolean
  sync2Checklist: {
    consularDossier3DaysReady?: boolean
    consularDossierReady?: boolean
    financialDocsVerified?: boolean
    invoicePaidToKorea?: boolean
    kStudyDepositOpened?: boolean
    kstudyFrozenAccountValid?: boolean
    tuberculosisPassed?: boolean
    invoiceReceiptVerified?: boolean
  }
  sync3DepartureReady: boolean
  sync3Checklist: {
    visaGrantNoticeIssued?: boolean
    visaGranted?: boolean
    paymentPhase3Collected: boolean
    flightTicketIssued?: boolean
    flightBooked?: boolean
    dormitoryAssigned?: boolean
  }
}

export interface ParallelCase {
  caseId: string
  studentId: string
  studentCode: string
  studentName: string
  dob: string
  phone: string
  targetIntake: string
  overallStatus: string
  updatedAt: string
  trainingTrack: {
    koreanLevel: string
    classCode: string
    attendanceRate: number
    missedDays: number
    topikGoal: string
    mockInterviewScore: number
    status: string
  }
  documentTrack: {
    schoolDossierProgress: number
    schoolDossierStatus: string
    consularDossierProgress: number
    consularDossierStatus: string
    consularDaysBeforeVisa: number
    financialVerification: {
      landCertificateVerified: boolean
      familyBusinessVerified: boolean
      savingsBookVerified: boolean
      verifiedBy: string
      note: string
    }
  }
  externalTrack: {
    studentCriteria: {
      gpa: number
      missedDaysHighSchool: number
      preferredRegion: string
      preferredMajor: string
    }
    applications: SchoolApplication[]
  }
  paymentTrack: {
    totalFee: number
    installments: PaymentInstallment[]
  }
  syncPoints: SyncPointStatus
}

export interface Task {
  taskId: string
  caseId: string
  studentName: string
  title: string
  department: DepartmentCode
  stageCode: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'
  assigneeName: string
  dueAt: string
  description: string
}

export interface Student {
  studentId: string
  studentCode: string
  fullName: string
  phone: string
  email: string
  dob: string
  nativeProvince: string
  targetIntake: string
  targetSchool: string
  targetMajor: string
  learningStatus: string
  registeredDate: string
  gpa: number
  topikLevel: string
}
