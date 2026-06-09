export type UserRole = '本人' | '家属';

export type AuthSession = {
  id: string;
  patientId: string;
  subjectNo: string;
  phone: string;
  currentUserRole: UserRole;
  lastLoginAt: string;
};

export type LoginInput = {
  identifier: string;
  code: string;
};
