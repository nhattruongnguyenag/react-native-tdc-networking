import {
    AutomobileEngineeringDepartment,
    DepartmentOfEnglish,
    DepartmentOfKoreanLanguage,
    FacultyOfAutomationTechnology,
    FacultyOfBusinessAdministration,
    FacultyOfElectricalEngineering,
    FacultyOfFinanceAndAccounting,
    FacultyOfInformationTechnology,
    FacultyOfMechanicalEngineeringAndManufacturing,
    FacultyOfTourism,
    JapaneseLanguageDepartment
  } from '../constants/Variables'
  import { useTranslation } from 'react-multi-lang'
  
  export const getFacultyTranslated = (name: string, t: ReturnType<typeof useTranslation>): string => {
    let result = ''
    switch (name) {
      case FacultyOfElectricalEngineering:
        result = t('Faculty.facultyOfElectricalEngineering')
        break
      case FacultyOfInformationTechnology:
        result = t('Faculty.facultyOfInformationTechnology')
        break
      case FacultyOfAutomationTechnology:
        result = t('Faculty.facultyOfAutomationTechnology')
        break
      case FacultyOfMechanicalEngineeringAndManufacturing:
        result = t('Faculty.facultyOfMechanicalEngineeringAndManufacturing')
        break
      case AutomobileEngineeringDepartment:
        result = t('Faculty.automobileEngineeringDepartment')
        break
      case FacultyOfFinanceAndAccounting:
        result = t('Faculty.facultyOfFinanceAndAccounting')
        break
      case FacultyOfBusinessAdministration:
        result = t('Faculty.facultyOfBusinessAdministration')
        break
      case FacultyOfTourism:
        result = t('Faculty.facultyOfTourism')
        break
      case DepartmentOfEnglish:
        result = t('Faculty.departmentOfEnglish')
        break
      case DepartmentOfKoreanLanguage:
        result = t('Faculty.departmentOfKoreanLanguage')
        break
      case JapaneseLanguageDepartment:
        result = t('Faculty.japaneseLanguageDepartment')
        break
      default:
        result = name;
    }
    return result
  }