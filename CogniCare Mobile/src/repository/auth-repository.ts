import { PatientLocalDataSource } from '@/data/local/patient-local-data-source';
import { SessionLocalDataSource } from '@/data/local/session-local-data-source';
import { createId, nowIso } from '@/model/common';

export class AuthRepository {
  constructor(
    private readonly sessions: SessionLocalDataSource,
    private readonly patients: PatientLocalDataSource
  ) {}

  getSession() {
    return this.sessions.getSession();
  }

  async login(identifier: string, code: string) {
    const normalizedIdentifier = identifier.trim();
    const normalizedCode = code.trim();

    if (!normalizedIdentifier) throw new Error('请输入手机号或受试者编号');
    if (!normalizedCode) throw new Error('请输入验证码');

    const patient = await this.patients.findByIdentifier(normalizedIdentifier);
    if (!patient) throw new Error('未查询到对应受试者信息');

    const session = {
      id: createId('session'),
      patientId: patient.id,
      subjectNo: patient.subjectNo,
      phone: patient.phone,
      currentUserRole: patient.currentUserRole,
      lastLoginAt: nowIso(),
    };

    await this.sessions.saveSession(session);
    return session;
  }

  logout() {
    return this.sessions.clearSession();
  }
}
