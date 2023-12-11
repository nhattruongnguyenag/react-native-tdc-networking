import { useTranslation } from 'react-multi-lang'
import { TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese'

export const getGroupForPost = (group: string, t: ReturnType<typeof useTranslation>): string => {
  let result = ''
  switch (group) {
    case 'group_tdc':
      result = t('Group.groupTdc')
      break
    case 'group_connect_business':
      result = t('Group.groupConnectBusiness')
      break
    case 'group_dien_dien_tu':
      result = t('Group.electricalElectronicsGroup')
      break
    case 'group_cong_nghe_thong_tin':
      result = t('Group.informationTechnologyGroup')
      break
    case 'group_cong_nghe_tu_dong':
      result = t('Group.automationTechnologyGroup')
      break
    case 'group_co_khi_che_tao_may':
      result = t('Group.mechanicalEngineeringAndManufacturingGroup')
      break
    case 'group_co_khi_oto':
      result = t('Group.automotiveMechanicalGroup')
      break
    case 'group_tai_chinh_ke_toan':
      result = t('Group.financeAccountingGroup')
      break
    case 'group_quan_tri_kinh_doanh':
      result = t('Group.businessAdministrationGroup')
      break
    case 'group_du_lich':
      result = t('Group.tourismGroup')
      break
    case 'group_tieng_anh':
      result = t('Group.englishGroup')
      break
    case 'group_tieng_han':
      result = t('Group.koreanGroup')
      break
    case 'group_bo_mon_tieng_nhat':
      result = t('Group.japaneseLanguageDepartmentGroup')
      break
    default:
      break
  }
  return result
}

