import type { Establisment } from "../establisment.interface";

export interface IEstablishmentRepository<QueryOptions> {
  getAll: (options: QueryOptions) => Promise<Establisment[]>;
  add: (establisment: Establisment) => Promise<void>;
}
