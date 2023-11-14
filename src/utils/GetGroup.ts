export const getGroupForPost = (group: string): string => {
  let result = ''
  switch (group) {
    case 'group_tdc':
      result = 'Group by TDC - Trường Cao Đẳng Công Nghệ Thủ Đức'
      break
    case 'group_connect_business':
      result = 'Cộng Đồng Kết Nối Doanh Nghiệp'
      break
    case 'group_dien_dien_tu':
      result = 'Điện - Điện Tử Group'
      break
    case 'group_cong_nghe_thong_tin':
      result = 'Công Nghệ Thông Tin Group'
      break
    case 'group_cong_nghe_tu_dong':
      result = 'Công Nghệ Tự Động Group'
      break
    case 'group_co_khi_che_tao_may':
      result = 'Cơ Khí Chế Tạo Máy Group'
      break
    case 'group_co_khi_oto':
      result = 'Cơ Khí Ô Tô Group'
      break
    case 'group_tai_chinh_ke_toan':
      result = 'Tài Chính - Kế Toán Group'
      break
    case 'group_quan_tri_kinh_doanh':
      result = 'Quản Trị Kinh Doanh Group'
      break
    case 'group_du_lich':
      result = 'Du Lịch Group'
      break
    case 'group_tieng_anh':
      result = 'Tiếng Anh Group'
      break
    case 'group_tieng_han':
      result = 'Tiếng Hàn Group'
      break
    case 'group_bo_mon_tieng_nhat':
      result = 'Bộ Môn Tiếng Nhật Group'
      break
    default:
      break
  }
  return result
}
