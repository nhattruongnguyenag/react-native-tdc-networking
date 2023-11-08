import { SERVER_ADDRESS } from './SystemConstant'

export const API_URL_POST = SERVER_ADDRESS + 'api/posts'
export const API_URL_BUSINESS_POST = SERVER_ADDRESS + 'api/posts/group?code=group_connect_business&userLogin='
export const API_URL_STUDENT_POST = SERVER_ADDRESS + 'api/posts/group?code=group_tdc&userLogin='
export const API_URL_FACULTY_POST = SERVER_ADDRESS + 'api/posts/group?code='
export const API_URL_LIKE = SERVER_ADDRESS + 'api/posts/like'
export const API_URL_GET_POST_BY_USER_ID = SERVER_ADDRESS + 'api/posts/user/'