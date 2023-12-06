import { AUTOMOBILE_ENGINEERING_DEPARTMENT, FACULTY_AUTOMATION_TECHNOLOGY, FACULTY_MECHANICAL_ENGINEERING_AND_MANUFACTURING, FACULTY_OF_BUSINESS_ADMINISTRASION, FACULTY_OF_ELECTRICAL_ENGINEERING, FACULTY_OF_ENGLISH, FACULTY_OF_FINANCE_AND_ACCOUNTING, FACULTY_OF_INFORMATION_TECHNOLOGY, FACULTY_OF_JAPANESE_LANGUAGE, FACULTY_OF_KOREAN_LANGUAGE, FACULTY_OF_TOURISM } from '../constants/StringVietnamese'
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
      result = FACULTY_OF_ELECTRICAL_ENGINEERING
      break
    case FacultyOfInformationTechnology:
      result = FACULTY_OF_INFORMATION_TECHNOLOGY
      break
    case FacultyOfAutomationTechnology:
      result = FACULTY_AUTOMATION_TECHNOLOGY
      break
    case FacultyOfMechanicalEngineeringAndManufacturing:
      result = FACULTY_MECHANICAL_ENGINEERING_AND_MANUFACTURING
    case AutomobileEngineeringDepartment:
      result = AUTOMOBILE_ENGINEERING_DEPARTMENT
      break
    case FacultyOfFinanceAndAccounting:
      result = FACULTY_OF_FINANCE_AND_ACCOUNTING
      break
    case FacultyOfBusinessAdministration:
      result = FACULTY_OF_BUSINESS_ADMINISTRASION
      break
    case FacultyOfTourism:
      result = FACULTY_OF_TOURISM
      break
    case DepartmentOfEnglish:
      result = FACULTY_OF_ENGLISH
      break
    case DepartmentOfKoreanLanguage:
      result = FACULTY_OF_KOREAN_LANGUAGE
      break
    case JapaneseLanguageDepartment:
      result = FACULTY_OF_JAPANESE_LANGUAGE
      break
    default:
      result = name
  }
  return result
}
