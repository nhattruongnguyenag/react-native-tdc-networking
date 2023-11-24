import { Business } from "../types/Business";
import { Student } from "../types/Student";
import { User } from "../types/User";

export function isStudent(user?: any): user is Student {
    return user !== undefined && user instanceof Object && user !== null && (user as User).roleCodes.includes('sinh-vien')
}

export function isBusiness(user?: any): user is Business {
    return user !== undefined && user instanceof Object && user !== null && (user as User).roleCodes.includes('doanh-nghiep')
}

export function isFaculty(user?: any): user is Business {
    return user !== undefined && user instanceof Object && user !== null && (user as User).roleCodes.includes('khoa')
}

export function isCensorShip(user?: any): user is Business {
    return user !== undefined && user instanceof Object && user !== null && (user as User).roleCodes.includes('kiem-duyet')
}

export function isAdmin(user?: any): user is Business {
    return user !== undefined && user instanceof Object && user !== null && (user as User).roleCodes.includes('quan-tri-vien')
}
