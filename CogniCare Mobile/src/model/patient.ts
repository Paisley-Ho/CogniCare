import { UserRole } from './auth';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  subjectNo: string;
  phone: string;
  currentUserRole: UserRole;
  lastScreeningDate: string;
};
