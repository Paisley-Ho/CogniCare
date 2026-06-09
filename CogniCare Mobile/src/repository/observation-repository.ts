import { ObservationLocalDataSource } from '@/data/local/observation-local-data-source';
import { createId, nowIso } from '@/model/common';
import { ObservationRecordInput } from '@/model/observation-record';

export class ObservationRepository {
  constructor(private readonly observations: ObservationLocalDataSource) {}

  list(patientId: string) {
    return this.observations.list(patientId);
  }

  get(id: string) {
    return this.observations.get(id);
  }

  async create(patientId: string, input: ObservationRecordInput) {
    const timestamp = nowIso();
    const record = {
      id: createId('observation'),
      patientId,
      ...input,
      notes: input.notes.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await this.observations.save(record);
    return record;
  }

  remove(id: string) {
    return this.observations.remove(id);
  }
}
