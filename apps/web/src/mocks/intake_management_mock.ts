import type { CaseByIntake, IntakeFlightPeriod, WeekStageId, DossierItem, ParentInfo } from '../types/schema'

export const INTAKE_PERIODS_DATA: IntakeFlightPeriod[] = [
  {
    periodId: 'PERIOD_2026_12',
    name: 'Kỳ bay Tháng 12/2026',
    intakeMonth: 12,
    intakeYear: 2026,
    isMainIntake: false,
    flightEstimatedDate: '2026-11-28',
    visaDeadline: '2026-11-10',
    schoolDeadline: '2026-09-30',
    targetKPI: 6,
    currentActive: 6,
    schoolDossier100Count: 6,
    invoiceReceivedCount: 5,
    visaDossier100Count: 4,
    applyingVisaCount: 3,
    visaGrantedCount: 2,
    delayWarnings: [
      {
        studentCode: 'SHD2026-005',
        studentName: 'Vũ Đức Thắng',
        currentStage: 'Hồ sơ lãnh sự (tuần 11)',
        warningType: 'URGENT',
        issueDescription: 'Chưa có Phiếu xét nghiệm lao phổi BV chỉ định và Sổ đóng băng K-Study $10k chưa chuyển tiếp',
        missingDocuments: ['Phiếu xét nghiệm lao phổi âm tính', 'Xác nhận mở sổ K-Study ngân hàng Hàn'],
        deadline: '2026-10-28',
        suggestedAction: 'Phòng Hồ sơ đôn đốc phụ huynh chuyển tiền mở sổ trong ngày 26/10 để kịp nộp visa trước 10/11'
      }
    ]
  },
  {
    periodId: 'PERIOD_2027_03',
    name: 'Kỳ bay Tháng 3/2027',
    intakeMonth: 3,
    intakeYear: 2027,
    isMainIntake: true,
    flightEstimatedDate: '2027-02-26',
    visaDeadline: '2027-02-05',
    schoolDeadline: '2026-11-15',
    targetKPI: 5,
    currentActive: 4,
    schoolDossier100Count: 2,
    invoiceReceivedCount: 0,
    visaDossier100Count: 0,
    applyingVisaCount: 0,
    visaGrantedCount: 0,
    delayWarnings: [
      {
        studentCode: 'SHD2026-002',
        studentName: 'Trần Thị Mai',
        currentStage: 'Tiếp nhận, xử lý hồ sơ đầu vào (2 tuần đầu)',
        warningType: 'URGENT',
        issueDescription: 'Thiếu trích lục Sổ đỏ nhà đất và Giấy phép kinh doanh hộ cá thể gia đình',
        missingDocuments: ['Sổ đỏ đất ở gia đình', 'Giấy phép đăng ký kinh doanh & biên lai thuế'],
        deadline: '2026-11-05',
        suggestedAction: 'Chuyên viên Lê Thị Thu hỗ trợ gia đình thủ tục trích lục tại phòng TN&MT trước 05/11'
      }
    ]
  },
  {
    periodId: 'PERIOD_2027_06',
    name: 'Kỳ bay Tháng 6/2027',
    intakeMonth: 6,
    intakeYear: 2027,
    isMainIntake: false,
    flightEstimatedDate: '2027-05-28',
    visaDeadline: '2027-05-08',
    schoolDeadline: '2027-02-28',
    targetKPI: 10,
    currentActive: 4,
    schoolDossier100Count: 0,
    invoiceReceivedCount: 0,
    visaDossier100Count: 0,
    applyingVisaCount: 0,
    visaGrantedCount: 0,
    delayWarnings: [
      {
        studentCode: 'SHD2027-011',
        studentName: 'Hoàng Văn Bách',
        currentStage: 'Tiếp nhận, xử lý hồ sơ đầu vào (2 tuần đầu)',
        warningType: 'WARNING',
        issueDescription: 'Chưa nộp Bản gốc Bằng tốt nghiệp THPT do trường cấp 3 chưa phát bằng chính thức',
        missingDocuments: ['Bản gốc Bằng tốt nghiệp THPT (đang dùng tạm giấy chứng nhận tạm thời)'],
        deadline: '2026-12-15',
        suggestedAction: 'Theo dõi hạn nhận bằng gốc từ Sở GD&ĐT để kịp tiến độ dịch thuật tuần 3'
      }
    ]
  },
  {
    periodId: 'PERIOD_2027_09',
    name: 'Kỳ bay Tháng 9/2027',
    intakeMonth: 9,
    intakeYear: 2027,
    isMainIntake: true,
    flightEstimatedDate: '2027-08-28',
    visaDeadline: '2027-08-05',
    schoolDeadline: '2027-05-31',
    targetKPI: 10,
    currentActive: 3,
    schoolDossier100Count: 0,
    invoiceReceivedCount: 0,
    visaDossier100Count: 0,
    applyingVisaCount: 0,
    visaGrantedCount: 0,
    delayWarnings: []
  },
  {
    periodId: 'PERIOD_2027_12',
    name: 'Kỳ bay Tháng 12/2027',
    intakeMonth: 12,
    intakeYear: 2027,
    isMainIntake: false,
    flightEstimatedDate: '2027-11-28',
    visaDeadline: '2027-11-10',
    schoolDeadline: '2027-09-30',
    targetKPI: 35,
    currentActive: 2,
    schoolDossier100Count: 0,
    invoiceReceivedCount: 0,
    visaDossier100Count: 0,
    applyingVisaCount: 0,
    visaGrantedCount: 0,
    delayWarnings: []
  }
]

// Hàm tạo danh mục hồ sơ mẫu chi tiết theo 7 mốc tuần
function generateDossierItemsForStudent(
  statusConfig: Partial<Record<WeekStageId, 'DONE' | 'DOING' | 'PENDING'>>
): Record<WeekStageId, DossierItem[]> {
  const isDone = (stage: WeekStageId) => statusConfig[stage] === 'DONE'
  const isDoing = (stage: WeekStageId) => statusConfig[stage] === 'DOING'

  return {
    W01_02: [
      {
        docId: 'DOC-01',
        name: 'Hợp đồng dịch vụ tư vấn du học SHD Korea (Đã ký 2 bên)',
        stageId: 'W01_02',
        category: 'GOC',
        status: 'COMPLETED',
        completedAt: '2026-06-15',
        deadline: '2026-06-20',
        requiredBy: 'SHD Korea & Kế toán'
      },
      {
        docId: 'DOC-02',
        name: '10 tấm hình 3.5x4.5 (Áo trắng, phông trắng, rõ tai)',
        stageId: 'W01_02',
        category: 'BIEU_MAU',
        status: 'COMPLETED',
        completedAt: '2026-06-16',
        deadline: '2026-06-25',
        requiredBy: 'TB 12/2026 (Mục VI)'
      },
      {
        docId: 'DOC-03',
        name: 'Bản gốc Học bạ & Bằng tốt nghiệp THPT',
        stageId: 'W01_02',
        category: 'GOC',
        status: 'COMPLETED',
        completedAt: '2026-06-18',
        deadline: '2026-06-30',
        requiredBy: 'TB 12/2026 & Trường HQ'
      },
      {
        docId: 'DOC-04',
        name: 'Bản gốc Hộ chiếu (còn hạn ≥ 1 năm)',
        stageId: 'W01_02',
        category: 'GOC',
        status: 'COMPLETED',
        completedAt: '2026-06-18',
        deadline: '2026-07-01',
        requiredBy: 'Lãnh sự & Trường'
      },
      {
        docId: 'DOC-05',
        name: '06 bản sao CCCD học viên + Bố + Mẹ (Mỗi người 2 bản)',
        stageId: 'W01_02',
        category: 'CONG_CHUNG',
        status: 'COMPLETED',
        completedAt: '2026-06-20',
        deadline: '2026-07-05',
        requiredBy: 'TB 12/2026 (Mục VI)'
      },
      {
        docId: 'DOC-06',
        name: '01 bản Giấy xác nhận thông tin cư trú CT07 đầy đủ thành viên',
        stageId: 'W01_02',
        category: 'CONG_CHUNG',
        status: 'COMPLETED',
        completedAt: '2026-06-22',
        deadline: '2026-07-10',
        requiredBy: 'TB 12/2026 & Lãnh sự'
      },
      {
        docId: 'DOC-07',
        name: '01 bản sao Giấy tờ nhà đất (Sổ hồng / Sổ đỏ gia đình)',
        stageId: 'W01_02',
        category: 'TAI_CHINH',
        status: isDone('W01_02') ? 'COMPLETED' : isDoing('W01_02') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W01_02') ? '2026-06-25' : undefined,
        deadline: '2026-07-15',
        requiredBy: 'TB 12/2026 & Bộ phận Hồ sơ',
        note: 'Dùng thẩm định năng lực tài chính bảo lãnh'
      },
      {
        docId: 'DOC-08',
        name: '01 bản sao Giấy phép ĐKKD & Biên lai đóng thuế (nếu có)',
        stageId: 'W01_02',
        category: 'TAI_CHINH',
        status: isDone('W01_02') ? 'COMPLETED' : 'MISSING',
        completedAt: isDone('W01_02') ? '2026-06-25' : undefined,
        deadline: '2026-07-15',
        requiredBy: 'Bộ phận Hồ sơ'
      }
    ],
    W03: [
      {
        docId: 'DOC-09',
        name: 'Bản dịch tiếng Hàn công chứng Học bạ THPT',
        stageId: 'W03',
        category: 'CONG_CHUNG',
        status: isDone('W03') ? 'COMPLETED' : isDoing('W03') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W03') ? '2026-07-20' : undefined,
        deadline: '2026-07-30',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-10',
        name: 'Bản dịch tiếng Hàn công chứng Bằng tốt nghiệp THPT',
        stageId: 'W03',
        category: 'CONG_CHUNG',
        status: isDone('W03') ? 'COMPLETED' : isDoing('W03') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W03') ? '2026-07-20' : undefined,
        deadline: '2026-07-30',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-11',
        name: 'Tem Hợp pháp hóa Lãnh sự Cục Lãnh sự Bộ Ngoại giao VN',
        stageId: 'W03',
        category: 'HOP_PHAP_HOA',
        status: isDone('W03') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W03') ? '2026-08-05' : undefined,
        deadline: '2026-08-10',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-12',
        name: 'Tem Hợp pháp hóa Lãnh sự quán Hàn Quốc tại Việt Nam',
        stageId: 'W03',
        category: 'HOP_PHAP_HOA',
        status: isDone('W03') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W03') ? '2026-08-20' : undefined,
        deadline: '2026-08-25',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-13',
        name: 'Bản Kế hoạch học tập (Study Plan) viết bằng tiếng Hàn / tiếng Anh',
        stageId: 'W03',
        category: 'BIEU_MAU',
        status: isDone('W03') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W03') ? '2026-08-15' : undefined,
        deadline: '2026-08-20',
        requiredBy: 'Giáo sư trường HQ'
      }
    ],
    W09: [
      {
        docId: 'DOC-14',
        name: 'Đơn xin nhập học (Application Form) chuẩn trường đối tác',
        stageId: 'W09',
        category: 'BIEU_MAU',
        status: isDone('W09') ? 'COMPLETED' : isDoing('W09') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W09') ? '2026-09-05' : undefined,
        deadline: '2026-09-10',
        requiredBy: 'Bộ phận Đối ngoại'
      },
      {
        docId: 'DOC-15',
        name: 'Phiếu vận đơn gửi hồ sơ gốc chuyển phát nhanh quốc tế EMS',
        stageId: 'W09',
        category: 'GOC',
        status: isDone('W09') ? 'COMPLETED' : isDoing('W09') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W09') ? '2026-09-12' : undefined,
        deadline: '2026-09-15',
        requiredBy: 'Bộ phận Đối ngoại',
        note: 'Mã vận đơn bưu chính bắt buộc lưu trữ để đối soát'
      },
      {
        docId: 'DOC-16',
        name: 'Email xác nhận tiếp nhận hồ sơ từ Phòng Quan hệ Quốc tế trường',
        stageId: 'W09',
        category: 'GOC',
        status: isDone('W09') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W09') ? '2026-09-18' : undefined,
        deadline: '2026-09-25',
        requiredBy: 'Trường Hàn Quốc'
      }
    ],
    W10: [
      {
        docId: 'DOC-17',
        name: 'Biên bản & Điểm đánh giá phỏng vấn trường đối tác',
        stageId: 'W10',
        category: 'GOC',
        status: isDone('W10') ? 'COMPLETED' : isDoing('W10') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W10') ? '2026-10-15' : undefined,
        deadline: '2026-10-20',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-18',
        name: 'Thư thông báo trúng tuyển chính thức (Letter of Acceptance)',
        stageId: 'W10',
        category: 'GOC',
        status: isDone('W10') ? 'COMPLETED' : isDoing('W10') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W10') ? '2026-10-20' : undefined,
        deadline: '2026-10-25',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-19',
        name: 'Bản gốc Invoice học phí & KTX từ trường Hàn Quốc (KRW)',
        stageId: 'W10',
        category: 'TAI_CHINH',
        status: isDone('W10') ? 'COMPLETED' : isDoing('W10') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W10') ? '2026-10-22' : undefined,
        deadline: '2026-10-25',
        requiredBy: 'Trường Hàn Quốc'
      },
      {
        docId: 'DOC-20',
        name: 'Phiếu thu Kế toán Lần 2 (30.000.000 VNĐ trong 3 ngày sau trúng tuyển)',
        stageId: 'W10',
        category: 'TAI_CHINH',
        status: isDone('W10') ? 'COMPLETED' : 'MISSING',
        completedAt: isDone('W10') ? '2026-10-24' : undefined,
        deadline: '2026-10-25',
        requiredBy: 'Kế toán SHD Korea (TB 43)'
      }
    ],
    W11: [
      {
        docId: 'DOC-21',
        name: 'Sổ tài khoản đóng băng K-Study 10.000 USD tại Shinhan Bank / Woori Bank',
        stageId: 'W11',
        category: 'TAI_CHINH',
        status: isDone('W11') ? 'COMPLETED' : isDoing('W11') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W11') ? '2026-10-25' : undefined,
        deadline: '2026-10-30',
        requiredBy: 'Lãnh sự quán Hàn Quốc',
        note: 'Bắt buộc hoàn thành trước ≥ 3 ngày nộp visa'
      },
      {
        docId: 'DOC-22',
        name: 'Phiếu xét nghiệm lao phổi âm tính bệnh viện chỉ định của Lãnh sự',
        stageId: 'W11',
        category: 'Y_TE',
        status: isDone('W11') ? 'COMPLETED' : isDoing('W11') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W11') ? '2026-10-24' : undefined,
        deadline: '2026-10-28',
        requiredBy: 'Lãnh sự quán HQ (Chợ Rẫy / Phổi TW)'
      },
      {
        docId: 'DOC-23',
        name: 'Bản dịch công chứng Phiếu lý lịch tư pháp số 1 (còn hạn 3 tháng)',
        stageId: 'W11',
        category: 'CONG_CHUNG',
        status: isDone('W11') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W11') ? '2026-10-22' : undefined,
        deadline: '2026-10-28',
        requiredBy: 'Lãnh sự quán HQ'
      }
    ],
    W14: [
      {
        docId: 'DOC-24',
        name: 'Tờ khai xin cấp thị thực Visa Lãnh sự (dán ảnh 3.5x4.5)',
        stageId: 'W14',
        category: 'BIEU_MAU',
        status: isDone('W14') ? 'COMPLETED' : isDoing('W14') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W14') ? '2026-11-02' : undefined,
        deadline: '2026-11-05',
        requiredBy: 'KVAC / Lãnh sự'
      },
      {
        docId: 'DOC-25',
        name: 'Biên lai tiếp nhận hồ sơ & Mã tra cứu Visa portal KVAC',
        stageId: 'W14',
        category: 'GOC',
        status: isDone('W14') ? 'COMPLETED' : isDoing('W14') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W14') ? '2026-11-05' : undefined,
        deadline: '2026-11-10',
        requiredBy: 'KVAC (Trung tâm tiếp nhận thị thực)'
      },
      {
        docId: 'DOC-26',
        name: 'Bản in Giấy xác nhận cấp thị thực (Visa Grant Notice)',
        stageId: 'W14',
        category: 'GOC',
        status: isDone('W14') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W14') ? '2026-11-20' : undefined,
        deadline: '2026-11-22',
        requiredBy: 'Bộ Tư pháp Hàn Quốc'
      }
    ],
    W19_20: [
      {
        docId: 'DOC-27',
        name: 'Vé máy bay 1 chiều sang Hàn Quốc (tối đa 250 USD theo chính sách TB 43)',
        stageId: 'W19_20',
        category: 'GOC',
        status: isDone('W19_20') ? 'COMPLETED' : isDoing('W19_20') ? 'PENDING' : 'MISSING',
        completedAt: isDone('W19_20') ? '2026-11-22' : undefined,
        deadline: '2026-11-25',
        requiredBy: 'SHD Korea & Hàng không'
      },
      {
        docId: 'DOC-28',
        name: 'Phiếu thu Kế toán Lần 3 (65.000.000 VNĐ trong 3 ngày sau khi có Visa)',
        stageId: 'W19_20',
        category: 'TAI_CHINH',
        status: isDone('W19_20') ? 'COMPLETED' : 'MISSING',
        completedAt: isDone('W19_20') ? '2026-11-24' : undefined,
        deadline: '2026-11-25',
        requiredBy: 'Kế toán SHD Korea (TB 43)'
      },
      {
        docId: 'DOC-29',
        name: 'Biên bản bàn giao sinh viên tại sân bay Incheon và nhận phòng KTX',
        stageId: 'W19_20',
        category: 'GOC',
        status: isDone('W19_20') ? 'COMPLETED' : 'PENDING',
        completedAt: isDone('W19_20') ? '2026-11-28' : undefined,
        deadline: '2026-11-29',
        requiredBy: 'SHD Korea chi nhánh Hàn Quốc'
      }
    ]
  }
}

export const CASES_BY_INTAKE_DATA: CaseByIntake[] = [
  // HỌC VIÊN 1: NGUYỄN MINH ANH (KỲ 12/2026 - Đang ở tuần 10-11)
  {
    caseId: 'case_2026_12_01',
    studentId: 'stu_demo_01',
    studentCode: 'SHD2026-001',
    studentName: 'Nguyễn Minh Anh',
    dob: '2005-04-12',
    phone: '0987***123',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Myongji (Seoul)',
    targetMajor: 'Quản trị kinh doanh (D4-1)',
    currentStageId: 'W10', // Phỏng vấn trường (tuần 10)
    stageStatus: 'COMPLETED',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_1',
      currentClass: 'Lớp KR-S1-08 (Cơ sở Thủ Đức)',
      attendanceRate: 98,
      missedDays: 1,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 2',
        score: 138,
        examDate: '2026-09-15',
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 8.5,
        teacherAssessment: 'Phản xạ tiếng Hàn rất tốt, tự tin khi phỏng vấn với trường Myongji'
      },
      consularInterviewPrep: {
        status: 'DANG_LUYEN',
        assessment: 'Đang ôn luyện bộ câu hỏi chứng minh tài chính và lý do du học'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DONE',
      W10: 'DONE',
      W11: 'DOING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true, // 20M
      phase2Paid: true, // 30M
      phase3Paid: false // 65M
    }
  },

  // HỌC VIÊN 2: VŨ ĐỨC THẮNG (KỲ 12/2026 - Đang ở tuần 11, CÓ NGUY CƠ DELAY)
  {
    caseId: 'case_2026_12_02',
    studentId: 'stu_demo_05',
    studentCode: 'SHD2026-005',
    studentName: 'Vũ Đức Thắng',
    dob: '2005-09-14',
    phone: '0965***888',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Hanyang (ERICA)',
    targetMajor: 'Kỹ thuật cơ khí (D4-1)',
    currentStageId: 'W11', // Hồ sơ lãnh sự (tuần 11)
    stageStatus: 'BLOCKED',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_1',
      currentClass: 'Lớp KR-S1-08',
      attendanceRate: 94,
      missedDays: 3,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 1',
        score: 110,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 8.0,
        teacherAssessment: 'Đạt phỏng vấn Hanyang ERICA'
      },
      consularInterviewPrep: {
        status: 'DANG_LUYEN',
        assessment: 'Cần củng cố cách giải thích nghề nghiệp bố mẹ'
      }
    },
    dossierItems: {
      ...generateDossierItemsForStudent({
        W01_02: 'DONE',
        W03: 'DONE',
        W09: 'DONE',
        W10: 'DONE',
        W11: 'DOING',
        W14: 'PENDING',
        W19_20: 'PENDING'
      }),
      W11: [
        {
          docId: 'DOC-21',
          name: 'Sổ tài khoản đóng băng K-Study 10.000 USD tại Shinhan Bank',
          stageId: 'W11',
          category: 'TAI_CHINH',
          status: 'MISSING',
          deadline: '2026-10-28',
          requiredBy: 'Lãnh sự quán Hàn Quốc',
          note: 'CẢNH BÁO: Phụ huynh chưa hoàn tất thủ tục mở sổ đóng băng tại Shinhan Bank'
        },
        {
          docId: 'DOC-22',
          name: 'Phiếu xét nghiệm lao phổi âm tính bệnh viện chỉ định của Lãnh sự',
          stageId: 'W11',
          category: 'Y_TE',
          status: 'MISSING',
          deadline: '2026-10-28',
          requiredBy: 'Bệnh viện Phổi TW / Chợ Rẫy',
          note: 'CẢNH BÁO GẤP: Chưa đi khám lao, hạn nộp visa chỉ còn 17 ngày'
        },
        {
          docId: 'DOC-23',
          name: 'Bản dịch công chứng Phiếu lý lịch tư pháp số 1',
          stageId: 'W11',
          category: 'CONG_CHUNG',
          status: 'COMPLETED',
          completedAt: '2026-10-18',
          deadline: '2026-10-25',
          requiredBy: 'Lãnh sự quán HQ'
        }
      ]
    },
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: true,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 3: PHẠM THẢO LINH (KỲ 12/2026 - Đang ở tuần 14, ĐÃ XIN VISA)
  {
    caseId: 'case_2026_12_03',
    studentId: 'stu_demo_04',
    studentCode: 'SHD2026-004',
    studentName: 'Phạm Thảo Linh',
    dob: '2005-02-18',
    phone: '0934***321',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Chung-Ang (CAU)',
    targetMajor: 'Thiết kế thời trang (D4-1)',
    currentStageId: 'W14', // Nộp visa (tuần 14)
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_2',
      currentClass: 'Lớp KR-S2-04',
      attendanceRate: 100,
      missedDays: 0,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 3',
        score: 155,
        examDate: '2026-07-20',
        targetGoal: 'TOPIK 3'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 9.5,
        teacherAssessment: 'Xuất sắc, nhận học bổng 30% ĐH Chung-Ang'
      },
      consularInterviewPrep: {
        status: 'DA_SAN_SANG',
        assessment: 'Đã hoàn thành 3 buổi luyện phỏng vấn giả định Lãnh sự'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DONE',
      W10: 'DONE',
      W11: 'DONE',
      W14: 'DOING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: true,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 4: TRẦN THỊ MAI (KỲ 3/2027 - Đang ở tuần 2, CÓ NGUY CƠ DELAY)
  {
    caseId: 'case_2027_03_01',
    studentId: 'stu_demo_02',
    studentCode: 'SHD2026-002',
    studentName: 'Trần Thị Mai',
    dob: '2006-08-20',
    phone: '0912***456',
    periodId: 'PERIOD_2027_03',
    intakeName: 'Kỳ bay Tháng 3/2027',
    targetSchool: 'Đại học Quốc gia Pusan',
    targetMajor: 'Truyền thông đại chúng (D4-1)',
    currentStageId: 'W01_02', // 2 tuần đầu
    stageStatus: 'BLOCKED',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-12 (Cơ sở Thủ Đức)',
      attendanceRate: 92,
      missedDays: 2,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 1 Level 2'
      },
      schoolInterviewPrep: {
        status: 'DANG_LUYEN',
        mockInterviewScore: 6.0,
        teacherAssessment: 'Đang rèn luyện cách giới thiệu bản thân bằng tiếng Hàn'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: {
      ...generateDossierItemsForStudent({
        W01_02: 'DOING',
        W03: 'PENDING',
        W09: 'PENDING',
        W10: 'PENDING',
        W11: 'PENDING',
        W14: 'PENDING',
        W19_20: 'PENDING'
      }),
      W01_02: [
        {
          docId: 'DOC-01',
          name: 'Hợp đồng dịch vụ tư vấn du học SHD Korea (Đã ký)',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'COMPLETED',
          completedAt: '2026-09-02',
          deadline: '2026-09-10',
          requiredBy: 'Kế toán & Pháp chế'
        },
        {
          docId: 'DOC-02',
          name: '10 tấm hình 3.5x4.5 nền trắng áo trắng',
          stageId: 'W01_02',
          category: 'BIEU_MAU',
          status: 'COMPLETED',
          completedAt: '2026-09-05',
          deadline: '2026-09-15',
          requiredBy: 'TB 12/2026'
        },
        {
          docId: 'DOC-03',
          name: 'Bản gốc Học bạ & Bằng tốt nghiệp THPT',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'COMPLETED',
          completedAt: '2026-09-08',
          deadline: '2026-09-20',
          requiredBy: 'Trường Pusan'
        },
        {
          docId: 'DOC-04',
          name: 'Bản gốc Hộ chiếu',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'COMPLETED',
          completedAt: '2026-09-10',
          deadline: '2026-09-25',
          requiredBy: 'Lãnh sự & Trường'
        },
        {
          docId: 'DOC-07',
          name: '01 bản sao Giấy tờ nhà đất (Sổ hồng / Sổ đỏ gia đình)',
          stageId: 'W01_02',
          category: 'TAI_CHINH',
          status: 'MISSING',
          deadline: '2026-11-05',
          requiredBy: 'Bộ phận Hồ sơ',
          note: 'CẢNH BÁO: Gia đình chưa gửi bản trích lục sổ đỏ do đang thế chấp ngân hàng'
        },
        {
          docId: 'DOC-08',
          name: '01 bản sao Giấy phép ĐKKD & Biên lai thuế hộ cá thể',
          stageId: 'W01_02',
          category: 'TAI_CHINH',
          status: 'MISSING',
          deadline: '2026-11-05',
          requiredBy: 'Bộ phận Hồ sơ',
          note: 'CẢNH BÁO: Thiếu giấy phép kinh doanh sạp vải chợ Vinh'
        }
      ]
    },
    paymentPhases: {
      phase1Paid: true, // 20M
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 5: LÊ HOÀNG NAM (KỲ 3/2027 - Đang ở tuần 3, Xử lý hồ sơ trường)
  {
    caseId: 'case_2027_03_02',
    studentId: 'stu_demo_03',
    studentCode: 'SHD2026-003',
    studentName: 'Lê Hoàng Nam',
    dob: '2004-11-05',
    phone: '0977***789',
    periodId: 'PERIOD_2027_03',
    intakeName: 'Kỳ bay Tháng 3/2027',
    targetSchool: 'Đại học Konkuk (Seoul)',
    targetMajor: 'Khoa học máy tính (D4-1)',
    currentStageId: 'W03', // Xử lý hồ sơ trường (tuần 3)
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-10',
      attendanceRate: 96,
      missedDays: 1,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 2',
        score: 125,
        targetGoal: 'TOPIK 3'
      },
      schoolInterviewPrep: {
        status: 'DANG_LUYEN',
        mockInterviewScore: 7.5,
        teacherAssessment: 'Tiến bộ nhanh, ngữ pháp chắc chắn'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DOING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 6: BÙI PHƯƠNG THẢO (KỲ 3/2027 - Đang ở tuần 9, Nộp hồ sơ trường)
  {
    caseId: 'case_2027_03_03',
    studentId: 'stu_demo_06',
    studentCode: 'SHD2026-006',
    studentName: 'Bùi Phương Thảo',
    dob: '2006-03-15',
    phone: '0903***555',
    periodId: 'PERIOD_2027_03',
    intakeName: 'Kỳ bay Tháng 3/2027',
    targetSchool: 'Đại học Dong-A (Busan)',
    targetMajor: 'Du lịch & Khách sạn (D4-1)',
    currentStageId: 'W09',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_1',
      currentClass: 'Lớp KR-S1-09',
      attendanceRate: 98,
      missedDays: 1,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 2',
        score: 130,
        examDate: '2026-09-15',
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 8.5,
        teacherAssessment: 'Tự tin, phát âm chuẩn giọng Seoul'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DOING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 7: ĐẶNG QUỐC ANH (KỲ 3/2027 - Tiếp nhận đầu vào)
  {
    caseId: 'case_2027_03_04',
    studentId: 'stu_demo_07',
    studentCode: 'SHD2026-007',
    studentName: 'Đặng Quốc Anh',
    dob: '2005-12-01',
    phone: '0918***999',
    periodId: 'PERIOD_2027_03',
    intakeName: 'Kỳ bay Tháng 3/2027',
    targetSchool: 'Đại học Kookmin (Seoul)',
    targetMajor: 'Kỹ thuật ô tô (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'COMPLETED',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-11',
      attendanceRate: 95,
      missedDays: 2,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DANG_LUYEN',
        mockInterviewScore: 7.0,
        teacherAssessment: 'Cần luyện thêm ngữ pháp nối câu'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DOING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 8: ĐỖ THÀNH ĐẠT (KỲ 12/2026 - Xuất cảnh bàn giao)
  {
    caseId: 'case_2026_12_04',
    studentId: 'stu_demo_08',
    studentCode: 'SHD2026-008',
    studentName: 'Đỗ Thành Đạt',
    dob: '2005-07-22',
    phone: '0945***111',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Myongji (Seoul)',
    targetMajor: 'Công nghệ thông tin (D4-1)',
    currentStageId: 'W19_20',
    stageStatus: 'COMPLETED',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_2',
      currentClass: 'Lớp KR-S2-03',
      attendanceRate: 100,
      missedDays: 0,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 3',
        score: 162,
        examDate: '2026-07-20',
        targetGoal: 'TOPIK 3'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 9.0,
        teacherAssessment: 'Xuất sắc'
      },
      consularInterviewPrep: {
        status: 'DA_SAN_SANG',
        assessment: 'Đã hoàn tất phỏng vấn mô phỏng'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DONE',
      W10: 'DONE',
      W11: 'DONE',
      W14: 'DONE',
      W19_20: 'DONE'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: true,
      phase3Paid: true
    }
  },

  // HỌC VIÊN 9: NGUYỄN NGỌC HUYỀN (KỲ 12/2026 - Xuất cảnh bàn giao)
  {
    caseId: 'case_2026_12_05',
    studentId: 'stu_demo_09',
    studentCode: 'SHD2026-009',
    studentName: 'Nguyễn Ngọc Huyền',
    dob: '2005-01-30',
    phone: '0971***222',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Nữ sinh Sungshin',
    targetMajor: 'Ngôn ngữ Hàn Quốc (D4-1)',
    currentStageId: 'W19_20',
    stageStatus: 'COMPLETED',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_2',
      currentClass: 'Lớp KR-S2-03',
      attendanceRate: 98,
      missedDays: 1,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 2',
        score: 140,
        examDate: '2026-07-20',
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 8.8,
        teacherAssessment: 'Tự tin, phong thái tốt'
      },
      consularInterviewPrep: {
        status: 'DA_SAN_SANG',
        assessment: 'Đạt chuẩn'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DONE',
      W10: 'DONE',
      W11: 'DONE',
      W14: 'DONE',
      W19_20: 'DONE'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: true,
      phase3Paid: true
    }
  },

  // HỌC VIÊN 10: TRẦN VĂN AN (KỲ 12/2026 - Nộp visa tuần 14)
  {
    caseId: 'case_2026_12_06',
    studentId: 'stu_demo_10',
    studentCode: 'SHD2026-010',
    studentName: 'Trần Văn An',
    dob: '2005-11-19',
    phone: '0983***333',
    periodId: 'PERIOD_2026_12',
    intakeName: 'Kỳ bay Tháng 12/2026',
    targetSchool: 'Đại học Quốc gia Chonnam',
    targetMajor: 'Kinh doanh quốc tế (D4-1)',
    currentStageId: 'W14',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'HOAN_THANH_SO_CAP_1',
      currentClass: 'Lớp KR-S1-07',
      attendanceRate: 96,
      missedDays: 2,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 2',
        score: 122,
        examDate: '2026-09-15',
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DA_SAN_SANG',
        mockInterviewScore: 8.0,
        teacherAssessment: 'Đạt chuẩn phỏng vấn trường'
      },
      consularInterviewPrep: {
        status: 'DANG_LUYEN',
        assessment: 'Đang ôn luyện vòng 2'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DONE',
      W09: 'DONE',
      W10: 'DONE',
      W11: 'DONE',
      W14: 'DOING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: true,
      phase3Paid: false
    }
  },

  // ===================== KỲ BAY THÁNG 6/2027 (4 HỌC VIÊN) =====================
  // HỌC VIÊN 11: HOÀNG VĂN BÁCH (KỲ 6/2027 - Có cảnh báo thiếu bằng gốc)
  {
    caseId: 'case_2027_06_01',
    studentId: 'stu_demo_11',
    studentCode: 'SHD2027-011',
    studentName: 'Hoàng Văn Bách',
    dob: '2006-05-18',
    phone: '0922***444',
    periodId: 'PERIOD_2027_06',
    intakeName: 'Kỳ bay Tháng 6/2027',
    targetSchool: 'Đại học Kyungsung (Busan)',
    targetMajor: 'Truyền thông & Đa phương tiện (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'BLOCKED',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-14',
      attendanceRate: 90,
      missedDays: 3,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: {
      ...generateDossierItemsForStudent({
        W01_02: 'DOING',
        W03: 'PENDING',
        W09: 'PENDING',
        W10: 'PENDING',
        W11: 'PENDING',
        W14: 'PENDING',
        W19_20: 'PENDING'
      }),
      W01_02: [
        {
          docId: 'DOC-01',
          name: 'Hợp đồng dịch vụ tư vấn du học SHD Korea (Đã ký 2 bên)',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'COMPLETED',
          completedAt: '2026-10-01',
          deadline: '2026-10-10',
          requiredBy: 'SHD Korea & Kế toán'
        },
        {
          docId: 'DOC-02',
          name: '10 tấm hình 3.5x4.5 (Áo trắng, phông trắng, rõ tai)',
          stageId: 'W01_02',
          category: 'BIEU_MAU',
          status: 'COMPLETED',
          completedAt: '2026-10-05',
          deadline: '2026-10-15',
          requiredBy: 'TB 12/2026 (Mục VI)'
        },
        {
          docId: 'DOC-03',
          name: 'Bản gốc Học bạ & Bằng tốt nghiệp THPT',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'MISSING',
          deadline: '2026-12-15',
          requiredBy: 'TB 12/2026 & Trường HQ',
          note: 'CẢNH BÁO: Chưa nộp Bản gốc Bằng tốt nghiệp THPT (đang dùng giấy tạm thời)'
        },
        {
          docId: 'DOC-04',
          name: 'Bản gốc Hộ chiếu (còn hạn ≥ 1 năm)',
          stageId: 'W01_02',
          category: 'GOC',
          status: 'COMPLETED',
          completedAt: '2026-10-12',
          deadline: '2026-10-25',
          requiredBy: 'Lãnh sự & Trường'
        },
        {
          docId: 'DOC-05',
          name: '06 bản sao CCCD học viên + Bố + Mẹ (Mỗi người 2 bản)',
          stageId: 'W01_02',
          category: 'CONG_CHUNG',
          status: 'COMPLETED',
          completedAt: '2026-10-15',
          deadline: '2026-10-25',
          requiredBy: 'TB 12/2026 (Mục VI)'
        },
        {
          docId: 'DOC-06',
          name: '01 bản Giấy xác nhận thông tin cư trú CT07 đầy đủ thành viên',
          stageId: 'W01_02',
          category: 'CONG_CHUNG',
          status: 'COMPLETED',
          completedAt: '2026-10-18',
          deadline: '2026-10-28',
          requiredBy: 'TB 12/2026 & Lãnh sự'
        },
        {
          docId: 'DOC-07',
          name: '01 bản sao Giấy tờ nhà đất (Sổ hồng / Sổ đỏ gia đình)',
          stageId: 'W01_02',
          category: 'TAI_CHINH',
          status: 'COMPLETED',
          completedAt: '2026-10-20',
          deadline: '2026-10-30',
          requiredBy: 'Bộ phận Hồ sơ'
        },
        {
          docId: 'DOC-08',
          name: '01 bản sao Giấy phép ĐKKD & Biên lai đóng thuế',
          stageId: 'W01_02',
          category: 'TAI_CHINH',
          status: 'COMPLETED',
          completedAt: '2026-10-20',
          deadline: '2026-10-30',
          requiredBy: 'Bộ phận Hồ sơ'
        }
      ]
    },
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 12: VŨ THÙY DUNG (KỲ 6/2027)
  {
    caseId: 'case_2027_06_02',
    studentId: 'stu_demo_12',
    studentCode: 'SHD2027-012',
    studentName: 'Vũ Thùy Dung',
    dob: '2006-09-04',
    phone: '0937***666',
    periodId: 'PERIOD_2027_06',
    intakeName: 'Kỳ bay Tháng 6/2027',
    targetSchool: 'Đại học Sejong (Seoul)',
    targetMajor: 'Quản trị khách sạn (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-14',
      attendanceRate: 98,
      missedDays: 1,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 13: NGUYỄN HẢI LONG (KỲ 6/2027)
  {
    caseId: 'case_2027_06_03',
    studentId: 'stu_demo_13',
    studentCode: 'SHD2027-013',
    studentName: 'Nguyễn Hải Long',
    dob: '2005-08-11',
    phone: '0966***777',
    periodId: 'PERIOD_2027_06',
    intakeName: 'Kỳ bay Tháng 6/2027',
    targetSchool: 'Đại học Soongsil (Seoul)',
    targetMajor: 'Kỹ thuật phần mềm (D4-1)',
    currentStageId: 'W03',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-13',
      attendanceRate: 96,
      missedDays: 2,
      topikStatus: {
        hasTopik: true,
        level: 'TOPIK 1',
        score: 105,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'DANG_LUYEN',
        mockInterviewScore: 7.0,
        teacherAssessment: 'Tiến độ tốt'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DONE',
      W03: 'DOING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 14: TRỊNH MỸ DUYÊN (KỲ 6/2027)
  {
    caseId: 'case_2027_06_04',
    studentId: 'stu_demo_14',
    studentCode: 'SHD2027-014',
    studentName: 'Trịnh Mỹ Duyên',
    dob: '2006-11-25',
    phone: '0981***888',
    periodId: 'PERIOD_2027_06',
    intakeName: 'Kỳ bay Tháng 6/2027',
    targetSchool: 'Đại học Gachon (Gyeonggi)',
    targetMajor: 'Điều dưỡng & Y sinh (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-14',
      attendanceRate: 94,
      missedDays: 2,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // ===================== KỲ BAY THÁNG 9/2027 (3 HỌC VIÊN) =====================
  // HỌC VIÊN 15: PHAN THANH TÙNG (KỲ 9/2027)
  {
    caseId: 'case_2027_09_01',
    studentId: 'stu_demo_15',
    studentCode: 'SHD2027-021',
    studentName: 'Phan Thanh Tùng',
    dob: '2006-04-03',
    phone: '0915***333',
    periodId: 'PERIOD_2027_09',
    intakeName: 'Kỳ bay Tháng 9/2027',
    targetSchool: 'Đại học Inha (Incheon)',
    targetMajor: 'Hậu cần & Logistics (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-15',
      attendanceRate: 97,
      missedDays: 1,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 16: LÊ BẢO NGỌC (KỲ 9/2027)
  {
    caseId: 'case_2027_09_02',
    studentId: 'stu_demo_16',
    studentCode: 'SHD2027-022',
    studentName: 'Lê Bảo Ngọc',
    dob: '2006-07-14',
    phone: '0942***555',
    periodId: 'PERIOD_2027_09',
    intakeName: 'Kỳ bay Tháng 9/2027',
    targetSchool: 'Đại học Ajou (Suwon)',
    targetMajor: 'Thương mại điện tử (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-15',
      attendanceRate: 95,
      missedDays: 2,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 17: TRẦN GIA HUY (KỲ 9/2027)
  {
    caseId: 'case_2027_09_03',
    studentId: 'stu_demo_17',
    studentCode: 'SHD2027-023',
    studentName: 'Trần Gia Huy',
    dob: '2006-10-10',
    phone: '0979***444',
    periodId: 'PERIOD_2027_09',
    intakeName: 'Kỳ bay Tháng 9/2027',
    targetSchool: 'Đại học Chung-Ang (Seoul)',
    targetMajor: 'Truyền thông đại chúng (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-15',
      attendanceRate: 92,
      missedDays: 3,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // ===================== KỲ BAY THÁNG 12/2027 (2 HỌC VIÊN) =====================
  // HỌC VIÊN 18: DƯƠNG MINH TRIẾT (KỲ 12/2027)
  {
    caseId: 'case_2027_12_01',
    studentId: 'stu_demo_18',
    studentCode: 'SHD2027-031',
    studentName: 'Dương Minh Triết',
    dob: '2006-02-12',
    phone: '0988***112',
    periodId: 'PERIOD_2027_12',
    intakeName: 'Kỳ bay Tháng 12/2027',
    targetSchool: 'Đại học Hongik (Seoul)',
    targetMajor: 'Thiết kế đồ họa (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-16',
      attendanceRate: 96,
      missedDays: 1,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  },

  // HỌC VIÊN 19: ĐOÀN KIM NGÂN (KỲ 12/2027)
  {
    caseId: 'case_2027_12_02',
    studentId: 'stu_demo_19',
    studentCode: 'SHD2027-032',
    studentName: 'Đoàn Kim Ngân',
    dob: '2006-08-08',
    phone: '0909***987',
    periodId: 'PERIOD_2027_12',
    intakeName: 'Kỳ bay Tháng 12/2027',
    targetSchool: 'Đại học Hanyang (Seoul)',
    targetMajor: 'Quản trị Du lịch (D4-1)',
    currentStageId: 'W01_02',
    stageStatus: 'IN_PROGRESS',
    training: {
      koreanStudyStatus: 'DANG_HOC',
      currentClass: 'Lớp KR-S1-16',
      attendanceRate: 99,
      missedDays: 0,
      topikStatus: {
        hasTopik: false,
        targetGoal: 'TOPIK 2'
      },
      schoolInterviewPrep: {
        status: 'CHUA_LUYEN'
      },
      consularInterviewPrep: {
        status: 'CHUA_LUYEN'
      }
    },
    dossierItems: generateDossierItemsForStudent({
      W01_02: 'DOING',
      W03: 'PENDING',
      W09: 'PENDING',
      W10: 'PENDING',
      W11: 'PENDING',
      W14: 'PENDING',
      W19_20: 'PENDING'
    }),
    paymentPhases: {
      phase1Paid: true,
      phase2Paid: false,
      phase3Paid: false
    }
  }
]

// Danh sách ảnh mẫu học viên chuẩn tỷ lệ 3x4 và ảnh phụ huynh
export const STUDENT_PHOTO_SAMPLES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80'
]

export const FATHER_PHOTO_SAMPLES = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80'
]

export const MOTHER_PHOTO_SAMPLES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&auto=format&fit=crop&q=80'
]

// Hàm tạo danh sách phụ huynh chi tiết & người bảo lãnh tài chính
export function generateParentsForCase(studentCode: string, studentName: string): ParentInfo[] {
  const specificMap: Record<string, ParentInfo[]> = {
    'SHD2026-001': [
      {
        parentId: 'par_001_f',
        fullName: 'Nguyễn Văn Thành',
        relationship: 'BO',
        relationLabel: 'Bố',
        phone: '0913 567 890',
        yearOfBirth: 1975,
        job: 'Giám đốc Công ty TNHH Vận tải Thành Đạt',
        workplace: 'KCN Đình Vũ, Hải Phòng',
        address: 'Quận Ngô Quyền, Hải Phòng',
        idCard: '031075001234',
        photoUrl: FATHER_PHOTO_SAMPLES[0],
        isFinancialSponsor: true,
        notes: 'Đứng tên Sổ tiết kiệm 1 tỷ VNĐ & Sao kê tài khoản doanh nghiệp'
      },
      {
        parentId: 'par_001_m',
        fullName: 'Lê Thị Hoa',
        relationship: 'ME',
        relationLabel: 'Mẹ',
        phone: '0982 345 678',
        yearOfBirth: 1978,
        job: 'Kế toán trưởng',
        workplace: 'Công ty CP May Hải Phòng',
        address: 'Quận Ngô Quyền, Hải Phòng',
        idCard: '031178005678',
        photoUrl: MOTHER_PHOTO_SAMPLES[0],
        isFinancialSponsor: false,
        notes: 'Đầu mối phụ trách hồ sơ cư trú CT07 & giấy tờ nhân thân'
      }
    ],
    'SHD2026-005': [
      {
        parentId: 'par_005_f',
        fullName: 'Vũ Văn Dũng',
        relationship: 'BO',
        relationLabel: 'Bố',
        phone: '0915 888 666',
        yearOfBirth: 1976,
        job: 'Chủ cơ sở chế biến gỗ mỹ nghệ & Hộ kinh doanh',
        workplace: 'Làng nghề Đông Giao, Cẩm Giàng, Hải Dương',
        address: 'Huyện Cẩm Giàng, Hải Dương',
        idCard: '030076008899',
        photoUrl: FATHER_PHOTO_SAMPLES[1],
        isFinancialSponsor: true,
        notes: '⚠️ Cần đôn đốc chuyển tiền mở sổ đóng băng K-Study 10.000 USD'
      },
      {
        parentId: 'par_005_m',
        fullName: 'Hoàng Thị Lan',
        relationship: 'ME',
        relationLabel: 'Mẹ',
        phone: '0974 999 111',
        yearOfBirth: 1979,
        job: 'Cán bộ Bưu điện huyện',
        workplace: 'Bưu điện huyện Cẩm Giàng, Hải Dương',
        address: 'Huyện Cẩm Giàng, Hải Dương',
        idCard: '030179004455',
        photoUrl: MOTHER_PHOTO_SAMPLES[1],
        isFinancialSponsor: false,
        notes: 'Đã hoàn thành xác nhận nhân thân và sổ hộ khẩu gia đình'
      }
    ],
    'SHD2026-002': [
      {
        parentId: 'par_002_f',
        fullName: 'Trần Quốc Tuấn',
        relationship: 'BO',
        relationLabel: 'Bố',
        phone: '0903 222 333',
        yearOfBirth: 1973,
        job: 'Chủ hộ kinh doanh nông sản xuất khẩu',
        workplace: 'Thị trấn Giao Thủy, Nam Định',
        address: 'Huyện Giao Thủy, Nam Định',
        idCard: '036073001122',
        photoUrl: FATHER_PHOTO_SAMPLES[2],
        isFinancialSponsor: true,
        notes: 'Đang xin cấp lại trích lục Sổ đỏ đất ở tại UBND huyện'
      },
      {
        parentId: 'par_002_m',
        fullName: 'Bùi Thị Thu',
        relationship: 'ME',
        relationLabel: 'Mẹ',
        phone: '0984 333 444',
        yearOfBirth: 1977,
        job: 'Quản lý cửa hàng tạp hóa gia đình',
        workplace: 'Thị trấn Giao Thủy, Nam Định',
        address: 'Huyện Giao Thủy, Nam Định',
        idCard: '036177003344',
        photoUrl: MOTHER_PHOTO_SAMPLES[2],
        isFinancialSponsor: false,
        notes: 'Hỗ trợ nộp biên lai thuế môn bài các năm gần nhất'
      }
    ],
    'SHD2026-004': [
      {
        parentId: 'par_004_f',
        fullName: 'Phạm Hồng Sơn',
        relationship: 'BO',
        relationLabel: 'Bố',
        phone: '0904 111 222',
        yearOfBirth: 1972,
        job: 'Sĩ quan công an hưu trí',
        workplace: 'Công an tỉnh Nghệ An',
        address: 'TP. Vinh, Nghệ An',
        idCard: '040072009988',
        photoUrl: FATHER_PHOTO_SAMPLES[3],
        isFinancialSponsor: true,
        notes: 'Bảo lãnh tài chính chính, đầy đủ sổ hưu và sao kê ngân hàng'
      },
      {
        parentId: 'par_004_m',
        fullName: 'Nguyễn Thị Kim Oanh',
        relationship: 'ME',
        relationLabel: 'Mẹ',
        phone: '0916 333 555',
        yearOfBirth: 1976,
        job: 'Giáo viên THPT Chuyên Phan Bội Châu',
        workplace: 'TP. Vinh, Nghệ An',
        address: 'TP. Vinh, Nghệ An',
        idCard: '040176007766',
        photoUrl: MOTHER_PHOTO_SAMPLES[3],
        isFinancialSponsor: false,
        notes: 'Người trao đổi trực tiếp lịch học tiếng và rèn luyện phỏng vấn'
      }
    ],
    'SHD2026-003': [
      {
        parentId: 'par_003_f',
        fullName: 'Lê Văn Khang',
        relationship: 'BO',
        relationLabel: 'Bố',
        phone: '0918 456 789',
        yearOfBirth: 1974,
        job: 'Kỹ sư trưởng Công ty Xây dựng',
        workplace: 'TP. Bắc Ninh, Bắc Ninh',
        address: 'TP. Bắc Ninh, Bắc Ninh',
        idCard: '027074001234',
        photoUrl: FATHER_PHOTO_SAMPLES[0],
        isFinancialSponsor: true,
        notes: 'Đã hoàn tất chứng minh thu nhập sao kê lương 35 triệu/tháng'
      },
      {
        parentId: 'par_003_m',
        fullName: 'Phạm Thanh Thảo',
        relationship: 'ME',
        relationLabel: 'Mẹ',
        phone: '0988 789 123',
        yearOfBirth: 1977,
        job: 'Bác sĩ chuyên khoa',
        workplace: 'Bệnh viện Đa khoa tỉnh Bắc Ninh',
        address: 'TP. Bắc Ninh, Bắc Ninh',
        idCard: '027177005678',
        photoUrl: MOTHER_PHOTO_SAMPLES[0],
        isFinancialSponsor: false,
        notes: 'Phụ trách theo dõi sức khỏe và lịch tiêm chủng, khám lao'
      }
    ]
  }

  if (specificMap[studentCode]) {
    return specificMap[studentCode]
  }

  const parts = studentName.replace(/\s*\(HV.*?\)/, '').trim().split(' ')
  const surname = parts[0] || 'Nguyễn'
  const middle = parts.length > 2 ? parts[1] : 'Văn'
  const codeNum = studentCode.replace(/\D/g, '') || '100'
  const baseSeed = parseInt(codeNum, 10)
  const randomFatherYear = 1972 + (baseSeed % 8)
  const randomMotherYear = randomFatherYear + 2 + (baseSeed % 3)
  const phoneSuffix = String(100 + (baseSeed % 900)).padStart(3, '0')

  return [
    {
      parentId: `par_${studentCode}_f`,
      fullName: `${surname} ${middle} Hùng`,
      relationship: 'BO',
      relationLabel: 'Bố',
      phone: `091${(baseSeed % 9) + 1} 456 ${phoneSuffix}`,
      yearOfBirth: randomFatherYear,
      job: 'Kinh doanh tự do / Hộ kinh doanh cá thể',
      workplace: 'Cơ sở sản xuất & Thương mại gia đình',
      address: 'Hải Dương / Hà Nội',
      idCard: `0300${String(randomFatherYear).slice(2)}00${phoneSuffix}`,
      photoUrl: FATHER_PHOTO_SAMPLES[baseSeed % FATHER_PHOTO_SAMPLES.length],
      isFinancialSponsor: true,
      notes: 'Bảo trợ tài chính chính, đứng tên sổ đỏ nhà đất & tài sản bảo lãnh'
    },
    {
      parentId: `par_${studentCode}_m`,
      fullName: `Nguyễn Thị Thanh Loan`,
      relationship: 'ME',
      relationLabel: 'Mẹ',
      phone: `098${((baseSeed + 3) % 9) + 1} 789 ${phoneSuffix}`,
      yearOfBirth: randomMotherYear,
      job: 'Cán bộ viên chức / Kế toán',
      workplace: 'Đơn vị hành chính sự nghiệp địa phương',
      address: 'Hải Dương / Hà Nội',
      idCard: `0301${String(randomMotherYear).slice(2)}00${phoneSuffix}`,
      photoUrl: MOTHER_PHOTO_SAMPLES[baseSeed % MOTHER_PHOTO_SAMPLES.length],
      isFinancialSponsor: false,
      notes: 'Đầu mối liên hệ gia đình tiếp nhận thông báo tiến độ & học phí'
    }
  ]
}

// Tự động gán ảnh thẻ 3x4 và danh sách phụ huynh cho toàn bộ học viên có sẵn
CASES_BY_INTAKE_DATA.forEach((c, idx) => {
  if (!c.photoUrl) {
    c.photoUrl = STUDENT_PHOTO_SAMPLES[idx % STUDENT_PHOTO_SAMPLES.length]
  }
  if (!c.parents || c.parents.length === 0) {
    c.parents = generateParentsForCase(c.studentCode, c.studentName)
  }
})

// Các hàm tiện ích truy xuất dữ liệu
export function getIntakePeriodById(periodId: string): IntakeFlightPeriod | undefined {
  return INTAKE_PERIODS_DATA.find((p) => p.periodId === periodId)
}

export function getCasesByPeriodId(periodId: string): CaseByIntake[] {
  return CASES_BY_INTAKE_DATA.filter((c) => c.periodId === periodId)
}

// Hàm sinh danh sách mô phỏng 40 hoặc 100 học viên cho mỗi kỳ bay để test giao diện trượt ngang 2 hàng x 4 ô
export function getSimulatedCohortForPeriod(periodId: string, totalCount = 40): CaseByIntake[] {
  const existing = CASES_BY_INTAKE_DATA.filter((c) => c.periodId === periodId)
  if (existing.length >= totalCount) {
    return existing
  }

  const periodObj = INTAKE_PERIODS_DATA.find((p) => p.periodId === periodId) || INTAKE_PERIODS_DATA[0]
  const sampleNames = [
    'Nguyễn Văn An', 'Trần Thị Bích', 'Lê Hoàng Cường', 'Phạm Minh Dũng',
    'Hoàng Thu Giang', 'Vũ Quốc Hải', 'Đặng Thảo My', 'Bùi Đức Nam',
    'Đỗ Thùy Linh', 'Ngô Quang Khải', 'Dương Kim Oanh', 'Lý Tuấn Phát',
    'Trịnh Mai Phương', 'Hồ Hữu Quân', 'Phan Thanh Sơn', 'Võ Thúy Quỳnh',
    'Đinh Bảo Trâm', 'Mai Văn Uy', 'Cao Hải Yến', 'Tạ Minh Triết',
    'Lâm Bảo Ngọc', 'Lương Gia Huy', 'Châu Thanh Tùng', 'Khổng Đình Trọng',
    'Quách Thị Hằng', 'Lê Khánh Huyền', 'Nguyễn Tiến Đạt', 'Trần Phương Thảo',
    'Phạm Quốc Bảo', 'Vũ Thùy Chi', 'Hoàng Gia Linh', 'Bùi Minh Đức',
    'Đỗ Văn Hậu', 'Ngô Thị Mai', 'Dương Quốc Anh', 'Lý Thị Thơ',
    'Trịnh Công Sơn', 'Hồ Thị Hương', 'Phan Minh Tuấn', 'Võ Ngọc Diệp'
  ]

  const sampleSchools = [
    { school: 'Đại học Myongji (Seoul)', major: 'Quản trị kinh doanh (D4-1)' },
    { school: 'Đại học Chung-Ang (CAU)', major: 'Truyền thông đại chúng (D4-1)' },
    { school: 'Đại học Hanyang (ERICA)', major: 'Kỹ thuật cơ khí (D4-1)' },
    { school: 'Đại học Konkuk (Seoul)', major: 'Khoa học máy tính (D4-1)' },
    { school: 'Đại học Quốc gia Pusan', major: 'Du lịch & Khách sạn (D4-1)' },
    { school: 'Đại học Sejong (Seoul)', major: 'Quản trị khách sạn (D4-1)' },
    { school: 'Đại học Soongsil (Seoul)', major: 'Kỹ thuật phần mềm (D4-1)' },
    { school: 'Đại học Inha (Incheon)', major: 'Logistics quốc tế (D4-1)' },
  ]

  const result: CaseByIntake[] = [...existing]
  const stagesList: WeekStageId[] = ['W01_02', 'W03', 'W09', 'W10', 'W11', 'W14', 'W19_20']

  for (let i = existing.length; i < totalCount; i++) {
    const name = sampleNames[i % sampleNames.length] + ` (HV ${i + 1})`
    const schoolObj = sampleSchools[i % sampleSchools.length]
    const stageId = stagesList[i % 3] // chủ yếu ở các giai đoạn đầu
    const codeNum = String(100 + i + 1).padStart(3, '0')

    result.push({
      caseId: `case_${periodId}_sim_${i + 1}`,
      studentId: `stu_sim_${periodId}_${i + 1}`,
      studentCode: `SHD2027-${codeNum}`,
      studentName: name,
      dob: '2006-05-15',
      phone: `098${i % 9}***${100 + i}`,
      photoUrl: STUDENT_PHOTO_SAMPLES[i % STUDENT_PHOTO_SAMPLES.length],
      periodId,
      intakeName: periodObj.name,
      targetSchool: schoolObj.school,
      targetMajor: schoolObj.major,
      currentStageId: stageId,
      stageStatus: i % 7 === 0 ? 'BLOCKED' : 'IN_PROGRESS',
      training: {
        koreanStudyStatus: 'DANG_HOC',
        currentClass: `Lớp KR-S1-${10 + (i % 5)}`,
        attendanceRate: 92 + (i % 8),
        missedDays: i % 4,
        topikStatus: {
          hasTopik: i % 4 === 0,
          level: i % 4 === 0 ? 'TOPIK 2' : undefined,
          targetGoal: 'TOPIK 2'
        },
        schoolInterviewPrep: {
          status: i % 3 === 0 ? 'DA_SAN_SANG' : 'DANG_LUYEN',
          mockInterviewScore: 7.0 + (i % 3),
        },
        consularInterviewPrep: {
          status: 'CHUA_LUYEN'
        }
      },
      dossierItems: generateDossierItemsForStudent({
        W01_02: stageId === 'W01_02' ? 'DOING' : 'DONE',
        W03: stageId === 'W03' ? 'DOING' : stageId === 'W01_02' ? 'PENDING' : 'DONE',
        W09: stageId === 'W09' ? 'DOING' : 'PENDING',
        W10: 'PENDING',
        W11: 'PENDING',
        W14: 'PENDING',
        W19_20: 'PENDING',
      }),
      paymentPhases: {
        phase1Paid: true,
        phase2Paid: false,
        phase3Paid: false
      },
      parents: generateParentsForCase(`SHD2027-${codeNum}`, name)
    })
  }

  return result
}

export function getCaseById(caseId: string): CaseByIntake | undefined {
  return CASES_BY_INTAKE_DATA.find((c) => c.caseId === caseId)
}
